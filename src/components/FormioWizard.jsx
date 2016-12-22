var React = require('react');
var FormioComponentsList = require('./FormioComponentsList').default;
var _ = require('lodash');

module.exports = React.createClass({
  displayName: 'FormioWizard',
  getInitialState: function() { return { currentPage: 0 }},

  nextPage: function(e) {
    e.preventDefault();
    console.log('data', this.props.data);

    this.setState((previousState) => {
      if (previousState.currentPage < (this.pages.length - 1)) {
        previousState.currentPage++;
      }
      return previousState;
    });
    //
  },

  previousPage: function() {
    this.setState((previousState) => {
      if (previousState.currentPage > 0) {
        previousState.currentPage--;
      }
      return previousState;
    });
  },

  render: function () {
    var data = _.clone(this.props.data);
    var pages = this.pages = [];
    var prevData = JSON.parse(localStorage.getItem('reactWizard')) || [];


    this.props.components.forEach(function(component, index) {
      if (component.type === 'panel') {
        pages.push(component);
      }
    });

    var pageArray = [];
    var curPageComponents = [];

    if(pages.length-1 >= this.state.currentPage){
      curPageComponents = pages[this.state.currentPage].components;
    }

    let renderButton = () => {
      if(this.state.currentPage+1 === pages.length) return (<button className="btn btn-primary" type="submit">Submit Form</button>)
      return (<button className="btn btn-primary" type="button" onClick={ this.nextPage }>Next</button>)
    };

    localStorage.setItem('reactWizard', JSON.stringify(Object.assign(prevData, data)));

    if(this.state.currentPage+1 === pages.length) {
      data = JSON.parse(localStorage.getItem('reactWizard'));
      this.props.state.submission.data = data;
      console.log('last page json string data', data);
    };

    for(var i = 0; i < pages.length;i++){
      var curPageClassName = 'col-sm-2 bs-wizard-step';
      var innerDot = 'bs-wizard-dot-inner';
      var isActive;

      if (i === this.state.currentPage) {
        isActive = ' active';
        innerDot += ' bg-success';
      }
      else if (i > this.state.currentPage) isActive = ' disabled';
      else if (i < this.state.currentPage) {
        isActive = ' complete';
        innerDot += ' bg-success';
      }

      pageArray.push(
        <div className={curPageClassName + isActive}>
          <div className='bs-wizard-stepnum-wrapper'>
            <div className='text-center bs-wizard-stepnum'>
              {pages[i].title}
            </div>
          </div>
          <div className='progress'>
            <div className='progress-bar progress-bar-primary'></div>
          </div>
          <a className='bs-wizard-dot bg-primary'>
            <div className={innerDot}></div>
          </a>
        </div>
      )
    }

    console.log('PROPS', this.props);

    return (
      <div className="formio-wizard">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Preview</h3>
            </div>
            <div className="panel-body">
              <div className="formio-wizard">
                <div className="row bs-wizard hasTitles">
                  {pageArray}
                </div>
                <FormioComponentsList
                  {...this.props}
                  components={curPageComponents}
                />
                <button className="btn btn-default" type="button">Cancel</button>
                <button className="btn btn-primary" type="button" onClick={ this.previousPage }>
                  Previous
                </button>
                {renderButton()}
              </div>
            </div>
          </div>
      </div>
    );
  }
});

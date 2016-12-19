var React = require('react');
var FormioComponentsList = require('./FormioComponentsList').default;

module.exports = React.createClass({
  displayName: 'FormioWizard',
  getInitialState: function() {
    console.log('from formiowizard, props: ', this.props);
    return { currentPage: 0 };
  },
  nextPage: function(event) {
    event.preventDefault();
    this.setState((previousState) => {
      if (previousState.currentPage < (this.pages.length - 1)) {
        previousState.currentPage++;
      }
      return previousState;
    });
  },
  previousPage: function() {
    this.setState((previousState) => {
      console.log({curPg: previousState.currentPage});
      if (previousState.currentPage > 0) {
        previousState.currentPage--;
      }
      return previousState;
    });
  },
  render: function () {
    var pages = this.pages = [];

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

    console.log('pages', pages);
    console.log('pageArray', pageArray);

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
                <button className="btn btn-primary" type="button" onClick={ this.nextPage }>
                  Next
                </button>
              </div>
            </div>
          </div>
      </div>
    );
  }
});

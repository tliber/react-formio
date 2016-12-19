'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var FormioComponentsList = require('./FormioComponentsList').default;

module.exports = React.createClass({
  displayName: 'FormioWizard',
  getInitialState: function getInitialState() {
    console.log('from formiowizard, props: ', this.props);
    console.log('from formiowizard, STATE: ', this.props.state);
    console.log('from formiowizard, data: ', this.props.data);
    return { currentPage: 0 };
  },
  nextPage: function nextPage(event) {
    var _this = this;

    event.preventDefault();
    this.setState(function (previousState) {
      if (previousState.currentPage < _this.pages.length - 1) {
        previousState.currentPage++;
      }
      return previousState;
    });
  },
  previousPage: function previousPage() {
    this.setState(function (previousState) {
      console.log({ curPg: previousState.currentPage });
      if (previousState.currentPage > 0) {
        previousState.currentPage--;
      }
      return previousState;
    });
  },
  render: function render() {
    var pages = this.pages = [];

    this.props.components.forEach(function (component, index) {
      if (component.type === 'panel') {
        pages.push(component);
      }
    });

    var pageArray = [];
    var curPageComponents = [];

    if (pages.length - 1 >= this.state.currentPage) {
      curPageComponents = pages[this.state.currentPage].components;
    }

    for (var i = 0; i < pages.length; i++) {
      var curPageClassName = 'col-sm-2 bs-wizard-step';
      var innerDot = 'bs-wizard-dot-inner';
      var isActive;

      if (i === this.state.currentPage) {
        isActive = ' active';
        innerDot += ' bg-success';
      } else if (i > this.state.currentPage) isActive = ' disabled';else if (i < this.state.currentPage) {
        isActive = ' complete';
        innerDot += ' bg-success';
      }

      pageArray.push(React.createElement(
        'div',
        { className: curPageClassName + isActive },
        React.createElement(
          'div',
          { className: 'text-center bs-wizard-stepnum' },
          pages[i].title
        ),
        React.createElement(
          'div',
          { className: 'progress' },
          React.createElement('div', { className: 'progress-bar progress-bar-primary' })
        ),
        React.createElement(
          'a',
          { className: 'bs-wizard-dot bg-primary' },
          React.createElement('div', { className: innerDot })
        )
      ));
    }

    return React.createElement(
      'div',
      { className: 'formio-wizard' },
      React.createElement(
        'div',
        { className: 'panel panel-default' },
        React.createElement(
          'div',
          { className: 'panel-heading' },
          React.createElement(
            'h3',
            { className: 'panel-title' },
            'Preview'
          )
        ),
        React.createElement(
          'div',
          { className: 'panel-body' },
          React.createElement(
            'div',
            { className: 'formio-wizard-wrapper' },
            React.createElement(
              'div',
              { className: 'row bs-wizard hasTitles' },
              pageArray
            ),
            React.createElement(FormioComponentsList, _extends({}, this.props, {
              components: curPageComponents
            })),
            React.createElement(
              'button',
              { className: 'btn btn-default', type: 'button' },
              'Cancel'
            ),
            React.createElement(
              'button',
              { className: 'btn btn-primary', type: 'button', onClick: this.previousPage },
              'Previous'
            ),
            React.createElement(
              'button',
              { className: 'btn btn-primary', type: 'button', onClick: this.nextPage },
              'Next'
            )
          )
        )
      )
    );
  }
});
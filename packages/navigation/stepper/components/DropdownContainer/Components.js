import * as tslib_1 from "tslib";
import styled, { keyframes, css } from 'styled-components';
var getDropdownRootKeyFrame = function (_a) {
    var animatingOut = _a.animatingOut, direction = _a.direction;
    if (!animatingOut && direction)
        return null;
    return keyframes(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  from {\n    transform: ", ";\n    opacity: ", ";\n  }\n  to {\n    transform: ", ";\n    opacity: ", ";\n  }\n"], ["\n  from {\n    transform: ", ";\n    opacity: ", ";\n  }\n  to {\n    transform: ", ";\n    opacity: ", ";\n  }\n"])), animatingOut ? 'rotateX(0)' : 'rotateX(-15deg)', animatingOut ? 1 : 0, animatingOut ? 'rotateX(-15deg)' : 'rotateX(0)', animatingOut ? 0 : 1);
};
var getAnimationName = css(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  animation-name: ", ";\n"], ["\n  animation-name: ", ";\n"])), getDropdownRootKeyFrame);
export var DropdownRoot = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  transform-origin: 0 0;\n  animation-name: ", ";\n  animation-duration: ", "ms;\n  /* use 'forwards' to prevent flicker on leave animation */\n  animation-fill-mode: forwards;\n  /* flex styles will center the caret child component */\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  top: -20px;\n"], ["\n  transform-origin: 0 0;\n  animation-name: ", ";\n  animation-duration: ", "ms;\n  /* use 'forwards' to prevent flicker on leave animation */\n  animation-fill-mode: forwards;\n  /* flex styles will center the caret child component */\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  top: -20px;\n"])), getAnimationName, function (props) { return props.duration; });
export var Caret = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  width: 0;\n  height: 0;\n  border-width: 10px;\n  border-style: solid;\n  border-color: transparent transparent var(--white);\n  /* make sure it's above the main dropdown container so now box-shadow bleeds over it */\n  z-index: 1;\n  position: relative;\n  /* prevent any gap in between caret and main dropdown */\n  top: 1px;\n"], ["\n  width: 0;\n  height: 0;\n  border-width: 10px;\n  border-style: solid;\n  border-color: transparent transparent var(--white);\n  /* make sure it's above the main dropdown container so now box-shadow bleeds over it */\n  z-index: 1;\n  position: relative;\n  /* prevent any gap in between caret and main dropdown */\n  top: 1px;\n"])));
export var DropdownBackground = styled.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  transform-origin: 0 0;\n  background-color: var(--white);\n  border-radius: 4px;\n  overflow: hidden;\n  position: relative;\n  box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1);\n  // 0 15px 35px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);\n  // left: 33%;\n  will-change: transform;\n"], ["\n  transform-origin: 0 0;\n  background-color: var(--white);\n  border-radius: 4px;\n  overflow: hidden;\n  position: relative;\n  box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1);\n  // 0 15px 35px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);\n  // left: 33%;\n  will-change: transform;\n"])));
export var AltBackground = styled.div(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  background-color: var(--light);\n  width: 300%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: -100%;\n  transform-origin: 0 0;\n  z-index: 0;\n  transition: transform ", "ms;\n"], ["\n  background-color: var(--light);\n  width: 300%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: -100%;\n  transform-origin: 0 0;\n  z-index: 0;\n  transition: transform ", "ms;\n"])), function (props) { return props.duration; });
export var InvertedDiv = styled.div(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n  position: ", ";\n  top: 0;\n  left: 0;\n  &:first-of-type {\n    z-index: 1;\n  }\n  &:not(:first-of-type) {\n    z-index: -1;\n  }\n"], ["\n  position: ", ";\n  top: 0;\n  left: 0;\n  &:first-of-type {\n    z-index: 1;\n  }\n  &:not(:first-of-type) {\n    z-index: -1;\n  }\n"])), function (props) { return (props.absolute ? 'absolute' : 'relative'); });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=Components.js.map
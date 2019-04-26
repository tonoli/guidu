/* tslint:disable:variable-name */
import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { colors, borderRadius, gridSize } from '@uidu/theme';
var AvatarImage = styled.img(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  border-radius: ", ";\n  cursor: pointer;\n  ", ";\n"], ["\n  border-radius: ", ";\n  cursor: pointer;\n  ",
    ";\n"])), borderRadius(), function (_a) {
    var isSelected = _a.isSelected;
    return isSelected
        ? "\n    box-shadow: 0px 0px 0px 1px white, 0px 0px 0px 3px " + colors.B200 + ";\n  "
        : '';
});
export var LargeAvatarImage = styled(AvatarImage)(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  width: ", "px;\n  height: ", "px;\n"], ["\n  width: ", "px;\n  height: ", "px;\n"])), gridSize() * 9, gridSize() * 9);
export var SmallAvatarImage = styled(AvatarImage)(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  width: ", "px;\n  height: ", "px;\n"], ["\n  width: ", "px;\n  height: ", "px;\n"])), gridSize() * 5, gridSize() * 5);
export var PredefinedAvatarViewWrapper = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  ul {\n    display: flex;\n    flex-flow: row wrap;\n    width: 353px;\n    max-height: 294px;\n    overflow-y: auto;\n\n    padding: 0;\n    margin: 0;\n\n    list-style-type: none;\n\n    li {\n      padding-right: 4px;\n      padding-left: 4px;\n      padding-bottom: 8px;\n      margin: 0;\n    }\n  }\n\n  .header {\n    display: flex;\n    align-items: center;\n\n    padding-top: 4px;\n    padding-bottom: 8px;\n\n    .description {\n      padding-left: 8px;\n    }\n\n    .back-button {\n      width: 32px;\n      height: 32px;\n      border-radius: 16px;\n\n      align-items: center;\n      justify-content: center;\n\n      margin: 0;\n      padding: 0;\n    }\n  }\n\n  /* hide tickbox and file type icon in overlay\n   * because those are not necessary for avatars */\n\n  .tickbox {\n    visibility: hidden;\n  }\n\n  .file-type-icon {\n    visibility: hidden;\n  }\n"], ["\n  ul {\n    display: flex;\n    flex-flow: row wrap;\n    width: 353px;\n    max-height: 294px;\n    overflow-y: auto;\n\n    padding: 0;\n    margin: 0;\n\n    list-style-type: none;\n\n    li {\n      padding-right: 4px;\n      padding-left: 4px;\n      padding-bottom: 8px;\n      margin: 0;\n    }\n  }\n\n  .header {\n    display: flex;\n    align-items: center;\n\n    padding-top: 4px;\n    padding-bottom: 8px;\n\n    .description {\n      padding-left: 8px;\n    }\n\n    .back-button {\n      width: 32px;\n      height: 32px;\n      border-radius: 16px;\n\n      align-items: center;\n      justify-content: center;\n\n      margin: 0;\n      padding: 0;\n    }\n  }\n\n  /* hide tickbox and file type icon in overlay\n   * because those are not necessary for avatars */\n\n  .tickbox {\n    visibility: hidden;\n  }\n\n  .file-type-icon {\n    visibility: hidden;\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=styled.js.map
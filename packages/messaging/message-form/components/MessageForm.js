import * as tslib_1 from "tslib";
import React, { cloneElement } from 'react';
import classNames from 'classnames';
import { Plus, Smile, BarChart2, Paperclip, ThumbsUp, Send, Clock, Mic, } from 'react-feather';
import { Picker } from 'emoji-mart';
import { Form, FormFooter, FormMeta, FormSubmit } from '@uidu/form';
import FieldMentions, { defaultStyle } from '@uidu/field-mentions';
import Dropdown, { DropdownItem, DropdownItemGroup } from '@uidu/dropdown-menu';
// import { Input, Mentions as MentionsInput } from '@uidu/inputs';
// import * as loadImage from 'blueimp-load-image';
// import {
//   mentionableMembers,
//   mentionableTeams,
//   mentionableContacts,
// } from 'apps/teams/utils';
// import { DirectUpload } from 'activestorage';
import 'emoji-mart/css/emoji-mart.css';
function fetchUsers(query, callback) {
    if (!query) {
        return Promise.resolve([]);
    }
    return (fetch("https://api.github.com/search/users?q=" + query)
        .then(function (response) { return response.json(); })
        // Transform the users to what react-mentions expects
        .then(function (json) {
        return json.items.map(function (user) { return ({ display: user.login, id: user.login }); });
    })
        .then(callback)
        .catch(function () { return []; }));
}
var container;
var MessagesForm = /** @class */ (function (_super) {
    tslib_1.__extends(MessagesForm, _super);
    function MessagesForm(props) {
        var _this = _super.call(this, props) || this;
        _this.form = React.createRef();
        _this.mentionsInput = React.createRef();
        _this.mentionsComponentInput = React.createRef();
        // onAdd = files => {
        //   Array.from(files).forEach((file, index) => {
        //     this.add(file, index + this.state.attachments.length);
        //     this.preview(file, index + this.state.attachments.length);
        //     this.upload(file, index + this.state.attachments.length);
        //   });
        // };
        // add = (file, index) => {
        //   this.setState({
        //     attachments: [...this.state.attachments, { position: index }],
        //     submitLabel: this.messageSender(),
        //   });
        // };
        // preview = (file, index) => {
        //   loadImage.parseMetaData(file, data => {
        //     let orientation = 0;
        //     if (data.exif) {
        //       orientation = data.exif.get('Orientation');
        //     }
        //     loadImage(
        //       file,
        //       () => {
        //         const reader = new window.FileReader();
        //         if (file.type.split('/')[0] === 'image') {
        //           reader.readAsDataURL(file);
        //           reader.onloadend = () => {
        //             const base64data = reader.result;
        //             this.setState({
        //               attachments: [
        //                 ...this.state.attachments.slice(0, index),
        //                 {
        //                   ...this.state.attachments[index],
        //                   filename: file.name,
        //                   type: file.type.split('/')[1],
        //                   previewUrl: base64data,
        //                 },
        //                 ...this.state.attachments.slice(index + 1),
        //               ],
        //             });
        //           };
        //         } else {
        //           this.setState({
        //             attachments: [
        //               ...this.state.attachments.slice(0, index),
        //               {
        //                 ...this.state.attachments[index],
        //                 filename: file.name,
        //                 type: file.type.split('/')[1],
        //                 // previewUrl: base64data,
        //               },
        //               ...this.state.attachments.slice(index + 1),
        //             ],
        //           });
        //         }
        //       },
        //       {
        //         orientation,
        //         canvas: true,
        //       },
        //     );
        //   });
        // };
        // upload = (file, index) => {
        //   const upload = new DirectUpload(
        //     file,
        //     '/rails/active_storage/direct_uploads',
        //   );
        //   upload.create((error, blob) => {
        //     if (error) {
        //       // Handle the error
        //     } else {
        //       this.setState({
        //         attachments: [
        //           ...this.state.attachments.slice(0, index),
        //           {
        //             ...this.state.attachments[index],
        //             ...blob,
        //           },
        //           ...this.state.attachments.slice(index + 1),
        //         ],
        //       });
        //     }
        //   });
        // };
        // remove = index => {
        //   this.setState(
        //     {
        //       attachments: this.state.attachments.filter((a, i) => index !== i),
        //     },
        //     () => {
        //       if (this.state.attachments.length === 0) {
        //         this.setState({
        //           submitLabel: this.thumbSender(),
        //         });
        //       }
        //     },
        //   );
        // };
        _this.isValid = function (canSubmit) {
            if (_this.state.attachments.length > 0) {
                return (_this.state.attachments.filter(function (a) { return !a.signed_id; }).length === 0 &&
                    canSubmit);
            }
            return canSubmit;
        };
        _this.handleSubmitLabel = function (_name, value) {
            if (value !== '') {
                _this.setState({
                    submitLabel: _this.messageSender(),
                });
            }
            else {
                _this.setState({
                    submitLabel: _this.props.message.body
                        ? _this.messageSender()
                        : _this.thumbSender(),
                });
            }
        };
        _this.handleSubmit = function (model) {
            var _a = _this.props, createMessage = _a.createMessage, updateMessage = _a.updateMessage, messageable = _a.messageable, message = _a.message;
            var modelToSubmit = {
                message: tslib_1.__assign({}, model.message, { body: model.message.body && model.message.body.value, mentions: model.message.body ? model.message.body.mentions : [] }),
            };
            if (!message.id) {
                return createMessage(messageable, modelToSubmit);
            }
            return updateMessage(messageable, message, modelToSubmit);
        };
        _this.handleThumb = function () {
            var _a = _this.props, createMessage = _a.createMessage, messageable = _a.messageable;
            return createMessage(messageable, {
                message: {
                    body: '👍',
                },
            });
        };
        _this.messageSender = function () { return (React.createElement(FormSubmit, { className: "btn-sm btn-teams ml-2 d-flex align-items-center", label: React.createElement(Send, { className: "d-flex", size: 18 }) })); };
        _this.thumbSender = function () { return (React.createElement("button", { className: "btn-sm btn-teams ml-2 d-flex align-items-center", type: "button", onClick: _this.handleThumb },
            React.createElement(ThumbsUp, { size: 18 }))); };
        _this.state = {
            attachments: [],
            emojiPicker: false,
            submitted: false,
            submitLabel: props.message.body
                ? _this.messageSender()
                : _this.thumbSender(),
        };
        return _this;
    }
    MessagesForm.prototype.render = function () {
        var _this = this;
        var _a = this.props, 
        // tasks,
        // teams,
        message = _a.message, placeholder = _a.placeholder, mentionables = _a.mentionables, 
        // organizationMembers,
        // callbacks
        onDismiss = _a.onDismiss, onSubmit = _a.onSubmit;
        var _b = this.state, submitted = _b.submitted, submitLabel = _b.submitLabel;
        return (React.createElement("div", { className: classNames('bg-white p-3 sticky-bottom position-relative', {
                border: !!message.body,
                'border-top': !message.body,
            }) },
            React.createElement("div", { id: "suggestionPortal", style: {
                    maxHeight: '400px',
                    position: 'absolute',
                    width: '100%',
                    left: 0,
                    bottom: '100%',
                    zIndex: 3000,
                }, ref: function (el) {
                    container = el;
                } }),
            React.createElement(Form, { ref: this.form, submitted: submitted, handleSubmit: function (model) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.handleSubmit(model)];
                            case 1:
                                _a.sent();
                                this.setState({
                                    attachments: [],
                                    emojiPicker: false,
                                    submitLabel: this.thumbSender(),
                                    submitted: true,
                                });
                                this.form.current.form.reset();
                                onSubmit();
                                return [2 /*return*/];
                        }
                    });
                }); }, className: classNames('', {
                    'd-flex': !message.body,
                }), inputsWrapperProps: {
                    className: 'd-flex flex-grow-1',
                }, footerRenderer: function (_a) {
                    var loading = _a.loading, canSubmit = _a.canSubmit;
                    if (message.body) {
                        return (React.createElement("div", { className: "px-2 pb-3" },
                            React.createElement(FormFooter, null,
                                React.createElement(FormMeta, { className: "d-flex" },
                                    cloneElement(_this.messageSender(), {
                                        loading: loading,
                                        canSubmit: _this.isValid(canSubmit),
                                        label: 'Salva',
                                    }),
                                    React.createElement("button", { type: "button", className: "btn btn-sm", onClick: function (e) {
                                            e.preventDefault();
                                            onDismiss();
                                        } }, "Annulla")))));
                    }
                    return (React.createElement("div", { className: "d-flex align-items-center align-self-center" },
                        React.createElement("button", { className: "btn btn-sm d-none d-md-flex align-items-center mb-0 text-muted px-2 shadow-none", type: "button", onClick: function () {
                                return _this.setState({
                                    emojiPicker: !_this.state.emojiPicker,
                                });
                            } },
                            React.createElement(Smile, { size: 18 })),
                        submitLabel &&
                            cloneElement(submitLabel, {
                                loading: loading,
                                canSubmit: _this.isValid(canSubmit),
                            })));
                } },
                !message.body && (React.createElement(Dropdown, { className: "align-self-center", trigger: React.createElement("button", { className: "btn btn-sm d-none d-md-flex align-items-center mb-0 text-muted px-2 shadow-none", type: "button" },
                        React.createElement(Plus, { size: 18 })) },
                    React.createElement(DropdownItemGroup, { title: "New..." },
                        React.createElement(DropdownItem, null,
                            React.createElement(Mic, { size: "1rem", className: "mr-2" }),
                            "Audio message"),
                        React.createElement(DropdownItem, null,
                            React.createElement(BarChart2, { size: "1rem", className: "mr-2" }),
                            "Poll"),
                        React.createElement(DropdownItem, null,
                            React.createElement(Clock, { size: "1rem", className: "mr-2" }),
                            "Reminder")),
                    React.createElement(DropdownItemGroup, { title: "Add a file from..." },
                        React.createElement(DropdownItem, null,
                            React.createElement(Paperclip, { size: "1rem", className: "mr-2" }),
                            "Your computer"),
                        React.createElement(DropdownItem, null,
                            React.createElement(BarChart2, { size: "1rem", className: "mr-2" }),
                            "Google Drive")))),
                React.createElement("div", { className: "d-flex align-items-center flex-grow-1" },
                    React.createElement(FieldMentions, { ref: this.mentionsInput, componentRef: this.mentionsComponentInput, className: "border-0 mr-2", layout: "elementOnly", name: "message[body]", onChange: this.handleSubmitLabel, required: this.state.attachments.length === 0, value: message.body ? { value: message.body } : '', onKeyDown: function (event) {
                            if (event.keyCode === 13 && !event.shiftKey) {
                                event.preventDefault();
                                _this.form.current.form.submit();
                            }
                        }, placeholder: placeholder, autoFocus: !!message.body, items: mentionables, style: tslib_1.__assign({}, defaultStyle, { suggestions: tslib_1.__assign({}, defaultStyle.suggestions, { marginTop: 0, position: 'relative', top: 0, left: 0, list: tslib_1.__assign({}, defaultStyle.suggestions.list, { maxHeight: '13rem', overflow: 'auto' }) }) }), suggestionsPortalHost: container }))),
            this.state.emojiPicker && (React.createElement(Picker, { onSelect: function (emoji) {
                    var previousValue = _this.mentionsInput.current.state.value;
                    var newValue = "" + (previousValue ? previousValue.value + " " : '') + emoji.native;
                    _this.mentionsInput.current.setValue(tslib_1.__assign({}, previousValue, { value: newValue, plainTextValue: newValue }));
                    _this.mentionsComponentInput.current.handleChange(null, newValue, newValue, previousValue ? previousValue.mentions : []);
                }, showPreview: true, style: {
                    width: '100%',
                    // position: 'relative',
                    // bottom: '64px',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    color: 'inherit',
                    borderRadius: 0,
                } }))));
    };
    MessagesForm.defaultProps = {
        placeholder: 'Add your message...',
        onSubmit: function () { },
        onDismiss: function () { },
        createMessage: console.log,
        updateMessage: console.log,
    };
    return MessagesForm;
}(React.Component));
export default MessagesForm;
//# sourceMappingURL=MessageForm.js.map
import { Box, Button } from '@material-ui/core';
import React from 'react';
import { AppContext } from '../../AppContext';
import Banner from '../banner/banner';
import Input from './Input';
import { Utils } from './Utils';

const hiddenInputStyle = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    top: '0px',
    border: 'none',
    outline: 'none',
    opacity: '0'
};

class DynamicForm extends React.Component {

    constructor(props) {
        super(props);
        this.initialFormValue = null;
        this.keyFieldMapping = {};
        this.generateKeyFieldMappingWithDefaultFormValue();
        this.state = {
            errors: {},
            isFormValid: false,
            apiErrorResponse: null,
            apiSuccessResponse: null
        };
    }

    componentDidMount() {
        this.setState({
            isFormValid: this.checkFormValidation()
        });
    }

    checkFormValidation(initialFormValue) {
        const formValue = initialFormValue || this.state;
        let isFormValid = true;
        let errors = {};
        this.props.FormInputArray.forEach(field => {
            let fieldErros = this.validateField(field, formValue[field.key] || "");            
            errors = {...errors, ...fieldErros};
        });
        for(const [key, value] of Object.entries(errors)) {
            if (value.length) {
                isFormValid = false;
                break;
            }
        }
        return isFormValid;
    }

    generateKeyFieldMappingWithDefaultFormValue() {
        const mapping = {};
        const defaultValue = {};
        this.props.FormInputArray.forEach(field => {
            mapping[field.key] = field
            defaultValue[field.key] = "";
        });
        this.keyFieldMapping = mapping;
        this.initialFormValue = defaultValue;
    }

    validateField(field, fieldValue) {
        
        const fieldErrors = [];
        const errors = {...this.state.errors};
        if (field.validations instanceof Object) {
            for (const [key, value] of Object.entries(field.validations) ) {
                // min length check
                if (key === 'minLength' && fieldValue.length < value) {            
                    fieldErrors.push(<p className="error-message" key={key}>Minlength should be {value}</p>);
                }

                // max length check
                if (key === 'maxLength' && fieldValue.length > value) {
                    fieldErrors.push(<p className="error-message" key={key}>Maxlength should be {value}</p>);
                }

                // confirm field
                if (key === 'shouldMatchField' && fieldValue !== this.state[value]) {
                    fieldErrors.push(<p className="error-message" key={key}>Does not match to {value}</p>)
                }

                // original field which needs confirmation field
                if (key === 'confirmFieldRef' && fieldValue !== this.state[value]) {
                    errors[value] = [<p className="error-message" key={key}>Does not match to {field.label}</p>];
                }
            }
        }
        return {
            ...errors,
            [field.key]: fieldErrors            
        };
    }

    onInput(field, value) {
        const errors = {            
            ...this.state.errors,
            ...this.validateField(field, value)            
        }
            
        this.setState({
            [field.key]: value,
            errors,
            isFormValid: this.checkFormValidation({...this.state, [field.key]: value})
        });
    }

    renderFields(field) {

        switch (field.fieldType) {
            case "input":
                return (
                    <Box component="div" className="margin-bottom-1" key={field.key}>
                        <Input 
                            type={this.state[field.key]}
                            {...field}
                            onInput = {(event) => this.onInput(field, event.target.value)}
                            errors = {this.state.errors[field.key]}
                        />
                    </Box>
                )     
            case "dropdown":
                return "dropdown component"
            case "checkbox":
                return "checkbox component"   
            default:
                break;
        }

    }

    renderForm() {
        const {
            FormInputArray
        } = this.props;
        return FormInputArray.map(field => this.renderFields(field));
    }

    async submitForm() {
        try {
            const formValue = {};
            const {
                FormInputArray,
                onFormSubmit
            } = this.props;
            FormInputArray.forEach(field => {
                if (field.requiredInApi) {
                    formValue[field.key] = this.state[field.key] || null;
                }
            });
            const response = await onFormSubmit(formValue);
            const error = Utils.checkForApiError(response);
            if (error !== null) {
                this.setState({
                    apiErrorResponse: error
                });
            } else {
                this.context.setShowBanner({apiSuccessResponse: response.message});
            }
        } catch (error) {
            this.context.setShowBanner({apiErrorResponse: error.message});
        } finally {
            this.handleAfterFormResponse();
        }
            
    }

    handleAfterFormResponse() {
        setTimeout(() => {
            this.context.setShowBanner(null);
        }, 5000);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.submitForm();
    }

    render() {
        return (
            <div className="dynamic-form-container">

                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <input type="submit" tabIndex="-1" style={hiddenInputStyle} />
                    {this.renderForm()}
                </form>
                

                <Button 
                    variant="contained" 
                    color="primary" 
                    className="submit-button" 
                    onClick={this.submitForm.bind(this)}
                    disabled={!this.state.isFormValid}
                >
                    SUBMIT
                </Button>
    
            </div>
        );
    }
}

DynamicForm.contextType = AppContext;

export default DynamicForm;
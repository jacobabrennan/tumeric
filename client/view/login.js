

//==============================================================================

//-- Dependencies --------------------------------
import client from '../client.js';
import view, { ID_VIEW_LOGIN } from './index.js';
import viewGameplay from './gameplay.js';

//-- Constants -----------------------------------
const ID_FORM_LOGIN = 'form-login';
const EVENT_SUBMIT = 'submit';
const INPUT_NAME = 'name';

//------------------------------------------------
export default Object.assign(Object.create(view), {
    elementId: ID_VIEW_LOGIN,
    async configure(configuration) {
        const form = document.getElementById(ID_FORM_LOGIN);
        form.addEventListener(EVENT_SUBMIT, handleSubmit);
        function handleSubmit(eventSubmit) {
            eventSubmit.preventDefault();
            const nameSelected = form.elements[INPUT_NAME].value;
            client.nameSelect(nameSelected);
            client.viewSwitch(viewGameplay)
        }
    },
    focus() {
        view.focus.apply(this, arguments);
        const form = document.getElementById(ID_FORM_LOGIN);
        const nameInput = form.elements[INPUT_NAME];
        nameInput.value = '';
        nameInput.focus();
    }
});



//==============================================================================

//-- Constants -----------------------------------
export const ID_VIEW_LOADING = 'view-loading';
export const ID_VIEW_LOGIN = 'view-login';
export const ID_VIEW_GAMEPLAY = 'view-gameplay';
const CLASS_ACTIVE = 'active';

//------------------------------------------------
export default {
    // elementId: ID_VIEW_EXAMPLE,
    blur() {
        const viewElement = document.getElementById(this.elementId);
        viewElement.classList.remove(CLASS_ACTIVE);
    },
    focus() {
        const viewElement = document.getElementById(this.elementId);
        viewElement.classList.add(CLASS_ACTIVE);
    },
};

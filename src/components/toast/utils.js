import checkIcon from
    "../../assets/svgs/check.svg";
import errorIcon from "../../assets/svgs/error.svg";
import infoIcon from "../../assets/svgs/info.svg";
import warningIcon from "../../assets/svgs/warning.svg";

//export let toastProperties = null;

export const showToast = (type, title, description) => {
    let toastProperties = null;
    console.log("type", type);
    const id = Math.floor((Math.random() * 100) + 1);

    switch (type) {
        case 'success':
            toastProperties = {
                id,
                title,
                //: 'Success',
                description,
                //: 'This is a success toast component',
                backgroundColor: '#5cb85c',
                icon: checkIcon
            }
            break;
        case 'danger':
            toastProperties = {
                id,
                title,
                //: 'Danger',
                description,
                //: 'This is an error toast component',
                backgroundColor: '#d9534f',
                icon: errorIcon
            }
            break;
        case 'info':
            toastProperties = {
                id,
                title,
                //: 'Info',
                description,
                //: 'This is an info toast component',
                backgroundColor: '#5bc0de',
                icon: infoIcon
            }
            break;
        case 'warning':
            toastProperties = {
                id,
                title,
                //: 'Warning',
                description,
                //: 'This is a warning toast component',
                backgroundColor: '#f0ad4e',
                icon: warningIcon
            }
            break;

        default:
            toastProperties = {}
            break
        // default:
        //   setState({
        //     list: []
        //   })
    }
    console.log("toastProperties in utils", toastProperties);
    return toastProperties;
}
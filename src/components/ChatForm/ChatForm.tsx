import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkCreateChat } from "../../redux/createChatReducer";
import { saveAccSettings } from "../../api/api";

import './ChatForm.scss';

const ChatForm = () => {
    const isCreate = useSelector((state: any) => state.chat.isCreate);
    const { register, handleSubmit } = useForm({mode: 'onBlur'});
    const {id, apiToken} = useSelector((state: any) => state.login);

    const dispatch = useDispatch();

    const onSubmit = (data: any) => {
        if (id && apiToken) {
            const chatId = `${data.phone}@c.us`;
            const message = 'test message =)';
            
            dispatch(checkCreateChat({id, apiToken, chatId, message}) as any);
            saveAccSettings(id, apiToken);
        }
    }

    if (isCreate) return <Navigate to="/chat" />;

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form__title">Заполните форму</h2>
            <ul className="form__wrapper">
                <li className="form__field">
                     <label className='form__label' htmlFor="idInstance">Введите номер телефона WhatsApp собеседника *</label>
                     <input className='form__input' {...register("phone", {required: 'Please enter phone'})} placeholder="79991234567" type="tel" />
                </li>
            </ul>
            <button className='form__btn'>Создать чат</button>
        </form>
    )
}

export default ChatForm;
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getMessage, deleteMessageNotification } from "../../api/api";
import { checkCreateChat } from "../../redux/createChatReducer";
import { addMessage } from "../../redux/messageReducer";

import { MessageType } from "../../redux/messageReducer";

import './Chat.scss';

const Chat = () => {
    const {id, apiToken} = useSelector((state: any) => state.login);
    const chatId = useSelector((state: any) => state.chat.chatId);
    const { register, handleSubmit } = useForm({mode: 'onBlur'});
    const messages = useSelector((state: any) => state.message);
    
    const dispatch = useDispatch();

    const onSubmit = async (data: any) => {
        if (id && apiToken && chatId) {
            const message = data.message;
            
            try {
                const response = await dispatch(checkCreateChat({id, apiToken, chatId, message}) as any);

                const newMessage: MessageType = {
                    receiptId: response.payload.id,
                    text: response.payload.message,
                    type: 'outgoing',
                }
                
                dispatch(addMessage(newMessage));
                
            } catch(error) {
                console.log('error request' + error);
            }
        }
    }

    const handleNotification = async (notification: any) => {
        if (!notification?.hasOwnProperty('body') || notification === null) {
            return;
        }

        let type = notification.body.typeWebhook;

        if (type === 'outgoingAPIMessageReceived') {
            type = 'outgoing';
        } else if (type === 'incomingMessageReceived') {
            type = 'incoming';
        }
        
        const response = await deleteMessageNotification(id, apiToken, notification.receiptId) as any;
        
        if (response.status === 200) {
            const text = notification.body.messageData.textMessageData.textMessage;
            
            const newMessage: MessageType = {
                receiptId: notification.receiptId,
                text: text,
                type: 'incoming',
            }

            dispatch(addMessage(newMessage));
        }
    };

    useEffect(() => {
        const checkIncomingMessages = async () => {
            try {
                const notification = await getMessage(id, apiToken);
                
                if ( notification ) {
                    await handleNotification(notification.data);
                }
            } catch (error) {
                console.error('Ошибка: ', error);
            }
        }

        const intervalId = setInterval(checkIncomingMessages, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <section className='chat'>
            <ul className='chat__messages'>
                {messages.map(({receiptId, text, type}: MessageType) => {
                    const elemClass = type === 'outgoing' ? 'chat__message chat__message--me' : 'chat__message';
                    return <li key={receiptId} className={elemClass}>{text}</li>
                })}
            </ul>
            <form className="chat__form" onSubmit={handleSubmit(onSubmit)}>
                <ul className="chat__form-wrapper">
                    <li className="chat__form-field">
                        <input className='chat__form-input' {...register("message", {required: 'Please enter message'})} placeholder="Введите сообщение" type="text" />
                    </li>
                </ul>
            </form>
        </section>
    )
}

export default Chat;
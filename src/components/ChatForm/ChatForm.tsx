import './chatForm.scss';

const ChatForm = () => {
    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form__title">Заполните форму</h2>
            <ul className="form__wrapper">
                <li className="form__field">
                     <label className='form__label' htmlFor="idInstance">Ваш ID *</label>
                     <input className='form__input' {...register("id", {required: 'Please enter your idInstence'})} type="text" autoComplete="off" />
                </li>
                <li className="form__field">
                     <label className='form__label' htmlFor="apiToken">Ваш токен *</label>
                     <input className='form__input' {...register("apiToken", {required: 'Please enter your apiToken'})} type="text" />
                </li>
            </ul>
            <button className='form__btn'>Войти</button>
        </form>
    )
}

export default ChatForm;
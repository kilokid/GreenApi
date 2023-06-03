import './LoginForm.scss';

const LoginForm = () => {
 return (
    <form className="form">
      <h2 className='form__title'>Заполните форму</h2>
      <ul className="form__wrapper">
         <li className="form__field">
            <label className='form__label' htmlFor="idInstance">Ваш ID *</label>
            <input className='form__input' type="text" id="idInstance" />
         </li>
         <li className="form__field">
            <label className='form__label' htmlFor="apiToken">Ваш токен *</label>
            <input className='form__input' type="text" id="apiToken" />
         </li>
      </ul>
      <button className='form__btn' type='button'>Войти</button>
    </form>
 );
}

export default LoginForm;
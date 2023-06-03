import './LoginForm.scss';

const LoginForm = () => {
 return (
    <form className="form">
      <ul className="form__wrapper">
         <li className="form__field">
            <input type="text" />
         </li>
         <li className="form__field">
            <input type="text" />
         </li>
      </ul>
    </form>
 );
}

export default LoginForm;
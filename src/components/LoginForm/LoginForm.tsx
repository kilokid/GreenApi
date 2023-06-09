import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { checkAuthorization } from '../../redux/loginReducer';

import './LoginForm.scss';

type FormDataType = {
   id: string,
   apiToken: string,
}

const LoginForm = () => {
   const isAuth = useSelector((state: any) => state.login.isAuth);

   const { register, handleSubmit } = useForm<FormDataType>({mode: 'onBlur'});

   const dispatch = useDispatch();

   const onSubmit = ({id, apiToken}: FormDataType) => {
      dispatch(checkAuthorization({id, apiToken}) as any);
   }

   if (isAuth) return <Navigate to="/chat-form" />;

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
   );
}

export default LoginForm;
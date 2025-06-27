"use client";

import React from "react";
import { CloseEye, OpenEye } from "../svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMsg from "../error-msg";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { login } from "../../redux/actions/userActions";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(6).label("Password"),
});

export default function LoginForm() {
  const [showPass, setShowPass] = React.useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.user);
  
  const {register, handleSubmit, reset, formState: { errors }} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await dispatch(login(data));
      if (login.fulfilled.match(result)) {
        reset();
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  });

  // Eğer kullanıcı zaten giriş yapmışsa dashboard'a yönlendir
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <form onSubmit={onSubmit}>
      <div className="tp-login-input-wrapper">
        {error && (
          <div className="alert alert-danger mb-3" role="alert">
            {error}
          </div>
        )}

        <div className="tp-login-input-box">
          <div className="tp-login-input-title">
            <label htmlFor="email">Your Email</label>
          </div>
          <div className="tp-login-input">
            <input 
              id="email" 
              {...register("email")} 
              type="email" 
              placeholder="liko@mail.com"
              disabled={loading}
            />
          </div>
          <ErrorMsg msg={errors.email?.message!} />
        </div>

        <div className="tp-login-input-box">
          <div className="tp-login-input-title">
            <label htmlFor="password">Password</label>
          </div>
          <div className="tp-login-input p-relative">
            <input
              id="password"
              type={showPass ? "text" : "password"}
              placeholder="Min. 6 character"
              {...register("password")}
              disabled={loading}
            />
            <div
              className="tp-login-input-eye"
              id="password-show-toggle"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass && (
                <span id="open-eye" className="open-eye">
                  <OpenEye />
                </span>
              )}
              {!showPass && (
                <span id="close-eye" className="open-close">
                  <CloseEye />
                </span>
              )}
            </div>
          </div>
          <ErrorMsg msg={errors.password?.message!} />
        </div>
      </div>

      <div className="tp-login-bottom">
        <button 
          type="submit" 
          className="tp-login-btn w-100"
          disabled={loading}
        >
          {loading ? 'Giriş yapılıyor...' : 'Login'}
        </button>
      </div>
    </form>
  );
}

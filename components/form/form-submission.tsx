'use client'
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ErrorMsg from '../error-msg';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { submitForm } from '@/redux/actions/formSubmissionActions';
import { toast } from 'sonner';

type FormData = {
  name: string;
  phone: string;
  message?: string;
};

const schema = yup.object().shape({
  name: yup.string().required().label("Name"),
  phone: yup.string().required().label("Phone"),
  message: yup.string().optional().label("Message"),
});

// prop type 
type IProps = {
  btnCls?: string;
  formData?: {
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    buttonText: string;
  };
}

export default function FormSubmission({ btnCls = '', formData }: IProps) {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector((state) => state.formSubmission);
  const [countryCode, setCountryCode] = useState('+90'); // Default to Turkey
  const [countryName, setCountryName] = useState('Turkey'); // Default to Turkey

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      await dispatch(submitForm({
        name: data.name,
        phone: data.phone,
        countryCode,
        countryName,
        message: data.message || '', // Include message if provided
      }));
      
      toast.success('Form başarıyla gönderildi');
      reset();
    } catch (err) {
      toast.error('Form gönderilirken bir hata oluştu');
    }
  });

  // Default values if formData is not provided (for backward compatibility)
  const labels = formData || {
    nameLabel: "İsim Soyisim",
    namePlaceholder: "İsim Soyisim",
    phoneLabel: "Telefon",
    phonePlaceholder: "Telefon Numaranız",
    messageLabel: "Mesajınız (Opsiyonel)",
    messagePlaceholder: "Mesajınızı yazabilirsiniz",
    buttonText: "Gönder"
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="cn-contactform-input mb-25">
        <label>{labels.nameLabel}</label>
        <input id='name' {...register("name")} type="text" placeholder={labels.namePlaceholder} />
        <ErrorMsg msg={errors.name?.message!} />
      </div>
      <div className="cn-contactform-input mb-25">
        <label>{labels.phoneLabel}</label>
        <div className="phone-input-container" style={{ display: 'flex' }}>
          <select 
            value={countryCode}
            onChange={(e) => {
              setCountryCode(e.target.value);
              // Set country name based on code
              if (e.target.value === '+90') setCountryName('Turkey');
              else if (e.target.value === '+44') setCountryName('United Kingdom');
              else if (e.target.value === '+1') setCountryName('United States');
              else setCountryName('Other');
            }}
            style={{ 
              width: '80px', 
              marginRight: '10px',
              padding: '0 10px',
              border: '1px solid #eaeaea',
              borderRadius: '5px',
              height: '55px'
            }}
          >
            <option value="+90">+90</option>
            <option value="+44">+44</option>
            <option value="+1">+1</option>
            <option value="+49">+49</option>
          </select>
          <input 
            id='phone' 
            {...register("phone")} 
            type="text" 
            placeholder={labels.phonePlaceholder} 
            style={{ flex: 1 }}
          />
        </div>
        <ErrorMsg msg={errors.phone?.message!} />
      </div>
      <div className="cn-contactform-input mb-25">
        <label>{labels.messageLabel}</label>
        <textarea id='message' {...register("message")} placeholder={labels.messagePlaceholder}></textarea>
        <ErrorMsg msg={errors.message?.message!} />
      </div>
      <div className="cn-contactform-btn">
        <button 
          className={`tp-btn-black-md ${btnCls} w-100`} 
          type="submit"
          disabled={loading}
        >
          {loading ? 'Gönderiliyor...' : labels.buttonText}
        </button>
      </div>
      {error && <div className="text-red-500 mt-3">{error}</div>}
    </form>
  );
} 
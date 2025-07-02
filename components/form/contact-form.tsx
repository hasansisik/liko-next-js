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
  subject: string;
  message: string;
};

const schema = yup.object().shape({
  name: yup.string().required().label("Name"),
  subject: yup.string().required().label("subject"),
  message: yup.string().required().label("Message"),
});

// prop type 
type IProps = {
  btnCls?: string;
  formData?: {
    nameLabel: string;
    namePlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    buttonText: string;
  };
}

export default function ContactForm({ btnCls = '', formData }: IProps) {
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
        phone: data.subject, // Using subject field as phone
        countryCode,
        countryName,
        message: data.message,
      }));
      
      toast.success('Form başarıyla gönderildi');
      reset();
    } catch (err) {
      toast.error('Form gönderilirken bir hata oluştu');
    }
  });

  // Default values if formData is not provided (for backward compatibility)
  const labels = formData || {
    nameLabel: "Name",
    namePlaceholder: "John Doe",
    subjectLabel: "Subject",
    subjectPlaceholder: "Your@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell Us About Your Project",
    buttonText: "Send Message"
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="cn-contactform-input mb-25">
        <label>{labels.nameLabel}</label>
        <input id='name' {...register("name")} type="text" placeholder={labels.namePlaceholder} />
        <ErrorMsg msg={errors.name?.message!} />
      </div>
      <div className="cn-contactform-input mb-25">
        <label>{labels.subjectLabel}</label>
        <input id='subject' {...register("subject")} type="text" placeholder={labels.subjectPlaceholder} />
        <ErrorMsg msg={errors.subject?.message!} />
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

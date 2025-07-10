"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from 'lucide-react';
import { IContactFormData, ICountry } from "@/types/contact-form-d-t";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getForm } from "@/redux/actions/formActions";
import { FormData } from "@/redux/actions/formActions";
import { submitForm } from "@/redux/actions/formSubmissionActions";
import { toast } from "sonner";

type ContactFormDentalProps = {
  className?: string; 
  style?: React.CSSProperties;
  formData?: IContactFormData;
};

const ContactFormDental = ({ 
  className = "",
  style = {},
  formData: staticFormData
}: ContactFormDentalProps) => {
  // Redux
  const dispatch = useAppDispatch();
  const { form, loading } = useAppSelector((state) => state.form);
  const { success, error, loading: submissionLoading } = useAppSelector((state) => state.formSubmission);
  
  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch form data from API
    dispatch(getForm());
  }, [dispatch]);

  // Set default country when form data is loaded
  useEffect(() => {
    if (form && form.countries && form.countries.length > 0 && !selectedCountry) {
      const defaultCountry = form.countries.find(country => country.code === form.defaultCountry) || form.countries[0];
      setSelectedCountry(defaultCountry);
    }
  }, [form, selectedCountry]);

  // Handle form submission success or error
  useEffect(() => {
    if (success && formSubmitted) {
      toast.success("Form başarıyla gönderildi!");
      setName("");
      setPhone("");
      setFormSubmitted(false);
    }
    
    if (error && formSubmitted) {
      toast.error(error || "Form gönderilirken bir hata oluştu.");
      setFormSubmitted(false);
    }
  }, [success, error, formSubmitted]);

  // Show loading state
  if (loading || !form || !selectedCountry) {
    return (
      <div className={`tp-dental-form-box ${className}`} style={{
        background: 'white',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
        ...style
      }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const filteredCountries = form.countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.phone.includes(searchTerm)
  );

  const handleCountrySelect = (country: ICountry) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      toast.error("Lütfen tüm alanları doldurunuz.");
      return;
    }
    
    dispatch(submitForm({
      name,
      phone,
      countryCode: selectedCountry.phone,
      countryName: selectedCountry.name
    }));
    
    setFormSubmitted(true);
  };

  return (
    <div className={`tp-dental-form-box ${className}`} style={{
      background: 'white',
      padding: '25px',
      borderRadius: '10px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '500px',
      ...style
    }}>
      <div className="tp-dental-form-header" style={{ marginBottom: '20px' }}>
        <h3 className="tp-dental-form-title" style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '10px',
          color: '#333',
          textAlign: 'center'
        }}>{form.title}</h3>
        <div className="tp-dental-form-status" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '5px'
        }}>
          <span className="tp-dental-status-dot" style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#4CAF50',
            borderRadius: '50%',
            marginRight: '8px'
          }}></span>
          <span className="tp-dental-status-text" style={{
            color: '#4CAF50',
            fontSize: '14px',
            fontWeight: '500'
          }}>{form.subtitle}</span>
        </div>
        <p className="tp-dental-form-response" style={{
          fontSize: '12px',
          color: '#666',
          margin: '0',
          textAlign: 'center'
        }}>{form.responseTime}</p>
      </div>
      
      <form className="tp-dental-form" onSubmit={handleSubmit}>
        <div className="tp-dental-form-input" style={{ marginBottom: '15px' }}>
          <input 
            type="text" 
            placeholder={form.placeholders.name} 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        
        <div className="tp-dental-form-phone" style={{
          display: 'flex',
          marginBottom: '20px',
          position: 'relative'
        }}>
          <div 
            className="tp-dental-phone-prefix" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              border: '1px solid #ddd',
              borderRight: 'none',
              borderRadius: '5px 0 0 5px',
              backgroundColor: '#f8f9fa',
              minWidth: '100px',
              height: '56px', // Fixed height to match input
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <span className="tp-dental-flag" style={{ marginRight: '5px' }}>{selectedCountry.flag}</span>
            <span style={{ fontSize: '14px', marginRight: '5px' }}>{selectedCountry.phone}</span>
            <ChevronDown size={14} style={{ 
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }} />
          </div>
          
          {isDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              right: '0',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '5px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 1000,
              maxHeight: '300px',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '10px' }}>
                <input
                  type="text"
                  placeholder={form.placeholders.countrySearch}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '3px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
              <div style={{ 
                maxHeight: '250px', 
                overflowY: 'auto',
                scrollbarWidth: 'thin'
              }}>
                {filteredCountries.map((country) => (
                  <div
                    key={country.code}
                    onClick={() => handleCountrySelect(country)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 15px',
                      cursor: 'pointer',
                      backgroundColor: selectedCountry.code === country.code ? '#f0f0f0' : 'transparent',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLDivElement).style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => (e.target as HTMLDivElement).style.backgroundColor = selectedCountry.code === country.code ? '#f0f0f0' : 'transparent'}
                  >
                    <span style={{ marginRight: '10px' }}>{country.flag}</span>
                    <span style={{ flex: 1, fontSize: '14px' }}>{country.name}</span>
                    <span style={{ fontSize: '14px', color: '#666' }}>{country.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <input 
            type="tel" 
            placeholder={form.placeholders.phone} 
            required 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '0 5px 5px 0',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        
        <button 
          type="submit" 
          className="tp-dental-form-btn" 
          disabled={submissionLoading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: submissionLoading ? '#999' : '#000',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: submissionLoading ? 'not-allowed' : 'pointer',
            marginBottom: form.showWhatsApp ? '15px' : '0',
            transition: 'background-color 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => !submissionLoading && ((e.target as HTMLButtonElement).style.backgroundColor = '#333')}
          onMouseLeave={(e) => !submissionLoading && ((e.target as HTMLButtonElement).style.backgroundColor = '#000')}
        >
          {submissionLoading ? 'Gönderiliyor...' : form.submitButtonText} 
          {!submissionLoading && <ArrowRight size={16} style={{ marginLeft: '8px' }} />}
        </button>
      
        {form.showWhatsApp && (
          <Link href={form.whatsAppLink} className="tp-dental-whatsapp-btn" style={{
            display: 'block',
            width: '100%',
            padding: '12px',
            backgroundColor: '#25D366',
            color: 'white',
            textAlign: 'center',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#1da851'}
          onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = '#25D366'}
          >
            {form.whatsAppText}
          </Link>
        )}
      </form>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default ContactFormDental; 
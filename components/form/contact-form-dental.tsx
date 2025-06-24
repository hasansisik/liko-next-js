"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';

type ContactFormDentalProps = {
  className?: string;
  style?: React.CSSProperties;
  showWhatsApp?: boolean;
  title?: string;
  subtitle?: string;
  responseTime?: string;
};

const ContactFormDental = ({ 
  className = "",
  style = {},
  showWhatsApp = true,
  title = "Let's Talk Teeth!",
  subtitle = "Online now",
  responseTime = "avg. response time: 3 minutes"
}: ContactFormDentalProps) => {
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
        }}>{title}</h3>
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
          }}>{subtitle}</span>
        </div>
        <p className="tp-dental-form-response" style={{
          fontSize: '12px',
          color: '#666',
          margin: '0',
          textAlign: 'center'
        }}>{responseTime}</p>
      </div>
      
      <form className="tp-dental-form">
        <div className="tp-dental-form-input" style={{ marginBottom: '15px' }}>
          <input 
            type="text" 
            placeholder="Name*" 
            required 
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
          marginBottom: '20px'
        }}>
          <div className="tp-dental-phone-prefix" style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px',
            border: '1px solid #ddd',
            borderRight: 'none',
            borderRadius: '5px 0 0 5px',
            backgroundColor: '#f8f9fa',
            minWidth: '80px'
          }}>
            <span className="tp-dental-flag" style={{ marginRight: '5px' }}>🇹🇷</span>
            <span style={{ fontSize: '14px' }}>+90</span>
          </div>
          <input 
            type="tel" 
            placeholder="Phone Number*" 
            required 
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
        
        <button type="submit" className="tp-dental-form-btn" style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#000',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          marginBottom: showWhatsApp ? '15px' : '0',
          transition: 'background-color 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#333'}
        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#000'}
        >
          Send <ArrowRight size={16} style={{ marginLeft: '8px' }} />
        </button>
      
        {showWhatsApp && (
          <Link href="#" className="tp-dental-whatsapp-btn" style={{
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
            💬 Chat on WhatsApp
          </Link>
        )}
      </form>
    </div>
  );
};

export default ContactFormDental; 
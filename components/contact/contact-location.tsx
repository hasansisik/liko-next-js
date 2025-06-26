import React from "react";
import Image from "next/image";
import { IContactInfoData } from "../../types/contact-d-t";

interface ContactLocationProps {
  contactInfoData: IContactInfoData;
}

const ContactLocation = ({ contactInfoData }: ContactLocationProps) => {
  return (
    <div className="cn-contact-info-area ">
      <div className="container container-1840">
        <div className="cn-contact-info-bg black-bg">
          {contactInfoData.locations.map((item) => (
            <div key={item.id} className="cn-contact-info-item">
              <div className="row">
                <div className="col-xl-7">
                  <div className="cn-contact-left d-flex flex-wrap align-items-center">
                    <div className="cn-contact-info-thumb">
                      <Image src={item.img} alt="image" width={200} height={150} style={{ height: "auto" , borderRadius:"10px"}} />
                    </div>
                    <div className="cn-contact-left-info">
                      <h4 className="cn-contact-left-title">{item.country}</h4>
                      <span>
                        <i className="fa-regular fa-clock"></i>
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="cn-contact-right-wrap d-flex align-items-start justify-content-between">
                    <div className="cn-contact-right">
                      <div className="cn-contact-location">
                        <span className="cn-contact-location-title">
                          {item.locationTitle}
                        </span>
                        <a
                          href={item.mapsUrl}
                          target="_blank"
                          dangerouslySetInnerHTML={{ __html: item.address }}
                        ></a>
                      </div>
                      <div className="cn-contact-map">
                        <a href={item.mapsUrl} target="_blank">{item.mapsText}</a>
                      </div>
                    </div>
                    <div className="cn-contact-right-info text-start text-md-end">
                      <a href={`tel:${item.phone}`}>{item.phone}</a> <br />
                      <a href={`mailto:${item.email}`}>{item.email}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactLocation;

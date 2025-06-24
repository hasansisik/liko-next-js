import React from 'react';
import { PolicyData } from '@/data/policy-data';

interface PolicyContentProps {
  data: PolicyData;
}

const PolicyContent: React.FC<PolicyContentProps> = ({ data }) => {
  return (
    <div className="service-details-area pt-100 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="service-details__content">
              <div className="service-details__content-text">
                {data.lastUpdated && (
                  <p>
                    <strong>
                      {data.title === 'HIPAA Privacy Notice' ? 'Effective Date:' : 'Last Updated:'}
                    </strong>{' '}
                    {new Date().toLocaleDateString()}
                  </p>
                )}
                
                <div 
                  className="policy-html-content"
                  dangerouslySetInnerHTML={{ __html: data.htmlContent }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyContent; 
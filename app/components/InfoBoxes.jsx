import React from 'react';
import InfoBox from './InfoBox';

function InfoBoxes() {
  return (
    // <!-- Services Section -->
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">

          <InfoBox
            heading="Need a Plumber?"
            buttonInfo={{
              text: 'View Services',
              link: '/services',
              backgroundColor: 'bg-black',
            }}
          >
            Explore our wide range of plumbing services – from pipe repairs to drain cleaning. Fast, reliable, and affordable help is just a click away.
          </InfoBox>

          <InfoBox
            heading="Are You a Plumbing Contractor?"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: 'Join Our Network',
              link: '/contractors/join',
              backgroundColor: 'bg-blue-500',
            }}
          >
            List your plumbing services with us and connect with customers looking for trusted professionals in their area.
          </InfoBox>

        </div>
      </div>
    </section>
  );
}

export default InfoBoxes;

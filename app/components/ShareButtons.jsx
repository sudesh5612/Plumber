"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

const ShareButtons = ({ service }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/services/${service._id}`;

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Service :
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          quote={service.name}
          hashtag={`#${service.category.replace(/\s/g, "")} Service`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={service.name}
          hashtags={[`${service.category.replace(/\s/g, "")}Service`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={service.name}
          separator=":: "
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={`Plumbing Service - ${service.name}`}
          body={`Check out this plumbing service offered: ${shareUrl}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButtons;

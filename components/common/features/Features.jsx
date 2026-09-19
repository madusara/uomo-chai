import { servicePromotions } from "@/data/features";
import React from "react";
import Image from "next/image";

export default function Features() {
  return (
    <section className="service-promotion container mb-md-4 pb-md-4 mb-xl-5">
      <div className="row">
        {servicePromotions.map((elm, i) => (
          <div key={i} className="col-md-4 text-center mb-5 mb-md-0">
            <div className="service-promotion__icon mb-3 d-flex justify-content-center align-items-center">
              {elm.icon?.startsWith("#") ? (
                <svg
                  width="72"
                  height="72"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href={elm.icon} />
                </svg>
              ) : (
                <Image
                  src={elm.icon}
                  width={140}
                  height={140}
                  alt={elm.title}
                  style={{
                    width: "135px",
                    height: "135px",
                    objectFit: "contain",
                    display: "inline-block",
                  }}
                />
              )}
            </div>
            <h3 className="service-promotion__title h5 text-uppercase fw-bold mb-2">
              {elm.title}
            </h3>
            {/* <p className="service-promotion__content text-secondary mb-0">
              {elm.content}
            </p> */}
          </div>
        ))}
      </div>
    </section>
  );
}

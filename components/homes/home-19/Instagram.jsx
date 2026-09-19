import { instagramImages3 } from "@/data/instagramIds";
import React from "react";
import Image from "next/image";

export default function Instagram() {
  return (
    <section className="instagram container">
      <div className="row">
        <div className="col-lg-4 px-0 d-flex flex-column">
          <div className="instagram__tile flex-1 d-flex">
            <div className="d-flex flex-column justify-content-center text-white bg-black px-4 px-xl-5 py-3">
              <h2 className="fs-35 fw-normal text-white mb-2">Built for Quality <br></br> Ready for Innovation.
</h2>
              <p className="mb-0">
               Our state-of-the-art facility meets international standards, prioritizing quality while delivering reliable, innovative food manufacturing solutions for growing brands.
              </p>
            </div>
          </div>
          <div className="instagram__tile">
            <a
              href="https://www.instagram.com/endless.greens?igsh=MXByNDg3MWx6ZTYzcw%3D%3D&utm_source=qr"
              target="_blank"
              className="position-relative overflow-hidden d-block effect overlay-plus"
            >
              <Image
                loading="lazy"
                className="instagram__img"
                src="/assets/images/home/demo20/f1.jpeg"
                width={466}
                height={525}
                alt="Insta image 1"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "466 / 525",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </a>
          </div>
        </div>
        <div className="col-lg-4 px-0">
          {instagramImages3.slice(0, 2).map((elm, i) => (
            <div key={i} className="instagram__tile">
              <a
                href="https://www.instagram.com/endless.greens?igsh=MXByNDg3MWx6ZTYzcw%3D%3D&utm_source=qr"
                target="_blank"
                className="position-relative overflow-hidden d-block effect overlay-plus"
              >
                <Image
                  loading="lazy"
                  className="instagram__img"
                  src={elm.imgSrc}
                  width={466}
                  height={401}
                  alt="Insta image 2"
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "466 / 401",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </a>
            </div>
          ))}
        </div>
        <div className="col-lg-4 px-0">
          {instagramImages3.slice(2, 4).map((elm, i) => (
            <div key={i} className="instagram__tile">
              <a
                href="https://www.instagram.com/endless.greens?igsh=MXByNDg3MWx6ZTYzcw%3D%3D&utm_source=qr"
                target="_blank"
                className="position-relative overflow-hidden d-block effect overlay-plus"
              >
                <Image
                  loading="lazy"
                  className="instagram__img"
                  src={elm.imgSrc}
                  width={466}
                  height={401}
                  alt="Insta image 2"
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "466 / 401",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

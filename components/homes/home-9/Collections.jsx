import React from "react";
import Link from "next/link";

export default function Collections({ collections }) {
  if (!collections || collections.length === 0) return null;

  const uniqueCollections = collections
    .filter(
      (item, index, list) =>
        index ===
        list.findIndex(
          (entry) =>
            (entry.id || entry.slug || entry.title) ===
            (item.id || item.slug || item.title),
        ),
    )
    .slice(0, 5);

  if (uniqueCollections.length === 0) return null;

  const [
    mainCollection,
    topLeftCollection,
    topRightCollection,
    bottomLeftCollection,
    bottomRightCollection,
  ] = uniqueCollections;

  // console.log(collections);
  return (
    <section className="collections-grid collections-grid_masonry gutters-20">
      <div className="h-md-100 full-width_padding-20">
        <div className="row h-md-100">
          <div className="col-lg-5 h-md-100">
            <div className="collection-grid__item position-relative h-md-100">
              <div
                className="background-img"
                style={{
                  backgroundImage: `url(${mainCollection.imageSrc})`,
                }}
              ></div>
              <div className="content_abs content_top content_left content_top-md content_left-md pt-2 px-2">
                <h3 className="text-uppercase mb-0">{mainCollection.title}</h3>
                <p className="mb-3">{mainCollection.productCount}</p>
                <Link
                  href="/shop/"
                  className="btn-link default-underline text-uppercase fw-medium"
                >
                  Shop Now
                </Link>
              </div>
              {/* <!-- /.content_abs content_top content_left content_top-md content_left-md pt-2 px-2 --> */}
            </div>
          </div>
          {/* <!-- /.col-md-6 --> */}

          <div className="col-lg-7 d-flex flex-column">
            <div className="position-relative flex-grow-1">
              <div className="row h-md-100">
                {topLeftCollection && (
                  <Link href={"/shop-1"} className="col-md-6 h-md-100">
                    <div className="collection-grid__item h-md-100 position-relative">
                      <div
                        className="background-img"
                        style={{
                          backgroundImage: `url(${topLeftCollection.imageSrc})`,
                        }}
                      ></div>
                      <div className="content_abs content_top content_left content_top-md content_left-md pt-2 px-2">
                        <h3 className="text-uppercase mb-0">
                          {topLeftCollection.title}
                        </h3>
                        <p className="mb-3">{topLeftCollection.productCount}</p>
                      </div>
                    </div>
                  </Link>
                )}

                {topRightCollection && (
                  <Link href={"/shop-1"} className="col-md-6 h-md-100">
                    <div className="collection-grid__item h-md-100 position-relative">
                      <div
                        className="background-img"
                        style={{
                          backgroundImage: `url(${topRightCollection.imageSrc})`,
                        }}
                      ></div>
                      <div className="content_abs content_top content_left content_top-md content_left-md pt-2 px-2">
                        <h3 className="text-uppercase mb-0">
                          {topRightCollection.title}
                        </h3>
                        <p className="mb-3">
                          {topRightCollection.productCount}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>

            <div className="position-relative flex-grow-1 mt-lg-3 pt-lg-1">
              <div className="row h-md-100">
                {bottomLeftCollection && (
                  <Link href={"/shop-1"} className="col-md-6 h-md-100">
                    <div className="collection-grid__item h-md-100 position-relative">
                      <div
                        className="background-img"
                        style={{
                          backgroundImage: `url(${bottomLeftCollection.imageSrc})`,
                        }}
                      ></div>
                      <div className="content_abs content_top content_left content_top-md content_left-md pt-2 px-2">
                        <h3 className="text-uppercase mb-0">
                          {bottomLeftCollection.title}
                        </h3>
                        <p className="mb-3">
                          {bottomLeftCollection.productCount}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}

                {bottomRightCollection && (
                  <Link href={"/shop-1"} className="col-md-6 h-md-100">
                    <div className="collection-grid__item h-md-100 position-relative">
                      <div
                        className="background-img"
                        style={{
                          backgroundImage: `url(${bottomRightCollection.imageSrc})`,
                        }}
                      ></div>
                      <div className="content_abs content_top content_left content_top-md content_left-md pt-2 px-2">
                        <h3 className="text-uppercase mb-0">
                          {bottomRightCollection.title}
                        </h3>
                        <p className="mb-3">
                          {bottomRightCollection.productCount}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
          {/* <!-- /.col-md-6 --> */}
        </div>
        {/* <!-- /.row --> */}
      </div>
      {/* <!-- /.container --> */}
    </section>
  );
}

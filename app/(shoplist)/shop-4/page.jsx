import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";

import Shop4 from "@/components/shoplist/Shop4";

export const metadata = {
  title: "Shop 4 | endlessLk",
  description: "Explore Shop 4 on endlessLk. Discover quality products, latest collections, and secure online shopping.",
};
export default function ShopPage4() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <Shop4 />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}

import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";

import Shop5 from "@/components/shoplist/Shop5";

export const metadata = {
  title: "Shop 5 | endlessLk",
  description: "Explore Shop 5 on endlessLk. Discover quality products, latest collections, and secure online shopping.",
};
export default function ShopPage5() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <Shop5 />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}

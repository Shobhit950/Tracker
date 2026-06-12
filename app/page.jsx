import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogIn, Rabbit, Shield, Bell } from "lucide-react";
import AddProductsForm from "@/components/ui/AddProductsForm";
import Authbutton from "@/components/Authbutton";
import { createClient } from "@/utils/supabase/server";
import { TrendingDown } from "lucide-react";
import { getProducts } from "./actions";
import ProductCard from "@/components/ui/ProductCard";


export default  async function Home() {
  const supabase = await createClient();
  const {
    data: {user},

  } = await supabase.auth.getUser();
  const products = user?await getProducts(): [];


  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
           <div className="flex items-center gap-3">
          <Image
            src="/deal-drop-logo.png"
            alt="logo"
            width={150}
            height={80}
          />
           </div>
          <Authbutton user={user} />

        </div>
       
      </header>

      {/* HERO */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Powered by Amazon
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Never Miss a Price Drop
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Track prices from any site. Get instant alerts on price drops.
          </p>
          <AddProductsForm user={user} />
          

          {/* FEATURES */}
          {products.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white p-6 rounded-xl border border-gray-200"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>

                  <h3 className="text-lg font-semibold text-center mb-2">
                    {title}
                  </h3>

                  <p className="text-gray-600 text-sm text-center">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {user && products.length > 0 && (<section className="max-w-7xl mx-auto px-4 pb-20">
        
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
             Your Tracked Products</h3>
          <span className="text-sm text-gray-500">
            {products.length} {products.length === 1 ? "product" : "products"}
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {products.map((product) => (<ProductCard key={product.id} product={product}/>
          ))}
        </div>
        </section>
        )}
      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
            <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}

    </main>
  );
}
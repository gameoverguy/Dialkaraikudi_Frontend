import React from "react";
import { FaClock, FaEnvelope, FaPhone, FaBuilding } from "react-icons/fa";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
          <h1 className="text-3xl font-bold text-white">Shipping Policy</h1>
          <p className="text-blue-100 mt-2">Company Name: Dial Karaikudi</p>
          <p className="text-blue-100">Website: www.dialkaraikudi.com</p>
          <p className="text-blue-100 mt-2 text-sm">
            Effective Date: May 24, 2025
          </p>
        </div>

        <div className="px-8 py-6 space-y-8 text-gray-700">
          <p>
            At Dial Karaikudi, we aim to provide a seamless experience for users
            discovering services or products from local vendors. The following
            shipping policies apply when you purchase any physical products or
            goods through our platform from the vendors listed.
          </p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <span>1. Product Shipping</span>
            </h2>
            <p>
              Dial Karaikudi does not directly handle shipping of physical
              products. All products listed on the website are shipped by the
              respective service providers or vendors. The vendors are
              responsible for processing, packaging, and delivering your
              purchased products within the agreed timelines.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <span>2. Shipping Timelines</span>
            </h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                Delivery Times: Shipping times vary depending on the vendor,
                location, and the type of product purchased. Most products will
                be delivered within 3–7 business days from the order date.
              </li>
              <li>
                Service Availability: Certain products may require specialized
                shipping arrangements. Please check with the vendor directly for
                custom products or large orders for estimated delivery times.
              </li>
              <li>
                For digital services (e.g., online training, digital downloads),
                immediate access is generally granted after purchase or
                enrollment, unless otherwise stated by the vendor.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <span>3. Shipping Fees</span>
            </h2>
            <p>
              Shipping fees for physical products vary based on the vendor’s
              pricing policy and delivery location. Shipping costs will be
              calculated and displayed at checkout, and you will be notified
              before confirming your order. Vendors may offer free shipping for
              certain products or orders above a certain value.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <span>4. Shipping Locations</span>
            </h2>
            <p>
              Vendors listed on Dial Karaikudi offer shipping to various
              locations across India. However, certain products may be
              restricted to specific regions due to logistics, product type, or
              vendor policies.
            </p>
            <p>
              Please verify the shipping eligibility for your location on the
              respective vendor’s page before placing an order.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <span>5. Order Tracking</span>
            </h2>
            <p>
              Once your order is shipped, the vendor will provide a tracking
              number (if available) to track the delivery status of your
              product. You can track your shipment via the vendor’s carrier
              (e.g., India Post, Blue Dart, etc.). For issues with tracking,
              please contact the vendor directly.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <span>6. Damaged or Missing Products</span>
            </h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                If you receive a damaged product, please immediately notify the
                vendor within 24–48 hours of delivery with photos of the damaged
                product.
              </li>
              <li>
                If the product is missing or lost during shipping, you must
                report it to the vendor within 7 days from the date of the
                expected delivery. The vendor will initiate an investigation and
                assist in resolving the issue.
              </li>
              <li>
                Dial Karaikudi is not responsible for damages or losses caused
                by shipping, but we will assist in facilitating communication
                between you and the vendor.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <span>7. Return & Exchange Policy</span>
            </h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                Vendor-specific Return Policy: Return and exchange policies vary
                by vendor and product. Please check the vendor’s return/exchange
                policy on their listing page before making a purchase.
              </li>
              <li>
                Eligibility for Returns: Generally, physical products may be
                eligible for return if they are damaged, defective, or not as
                described. Return requests must be made within 7 days of
                receiving the product.
              </li>
              <li>
                For digital services, returns or exchanges are not applicable,
                except in cases where the service is misrepresented.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <span>8. Custom and Bulk Orders</span>
            </h2>
            <p>
              If you are placing a custom order or a bulk order, shipping
              timelines and costs may differ from regular product listings.
              Please contact the vendor directly to discuss pricing, delivery
              timelines, and shipping arrangements.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <span>9. International Shipping</span>
            </h2>
            <p>
              Currently, Dial Karaikudi only supports domestic shipping within
              India. International shipping is not available through the
              platform, but you may contact the vendor directly to inquire about
              international shipping options (if applicable).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <span>10. Contact Us</span>
            </h2>
            <p>
              If you have any questions about shipping, tracking, or delivery of
              your product, please contact the respective vendor directly. For
              general inquiries or support, you can reach out to us:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-purple-600" />{" "}
                <span>Email: admin@dialkaraikudi.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-purple-600" />{" "}
                <span>Phone: 9442338670</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaBuilding className="text-purple-600" />{" "}
                <span>
                  Address: No.8 Dial Karaikudi Muthoorani East, Muthupattinam
                  Karaikudi – 630 001
                </span>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
              <FaClock className="text-blue-600" />{" "}
              <span>11. Policy Updates</span>
            </h2>
            <p>
              We may update this Shipping Policy from time to time. Updates will
              be posted on this page, and the "Effective Date" will be revised.
              Please check periodically for changes. Your continued use of our
              platform after changes means you accept the updated policy.
            </p>
          </section>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 text-center">
              This shipping policy is subject to change. Users will be notified
              of any significant changes via email or platform notifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;

import { Mail, Phone, Clock } from "lucide-react";

const ContactInfo = () => {
  return (
    <section className="bg-[#f0fdf4] py-10 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-green-800">
          Need Help? Reach Us Directly
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-green-900">
          {/* Email */}
          <div className="flex items-start gap-4">
            <Mail className="text-green-600 mt-1" />
            <div>
              <p className="font-bold">Email</p>
              <a
                href="mailto:achoudhary.aryan@gmail.com"
                className="text-green-700 hover:underline"
              >
                achoudhary.aryan@gmail.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4">
            <Phone className="text-green-600 mt-1" />
            <div>
              <p className="font-bold">Phone</p>
              <a
                href="tel:+916375249154"
                className="text-green-700 hover:underline"
              >
                +91-6375249154
              </a>
              <br />
              <a
                href="https://wa.me/916375249154"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline text-sm"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-4">
            <Clock className="text-green-600 mt-1" />
            <div>
              <p className="font-bold">Hours</p>
              <p>Mon–Sat: 9 AM – 6 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;

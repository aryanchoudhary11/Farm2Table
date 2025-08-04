import { Mail, Phone, Clock } from "lucide-react";
const ContactInfo = () => {
  return (
    <section className="bg-[#f0fdf4] py-10 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:md-text-3xl font-semibold mb-6 text-green-800">
          Need Help? Reach Us Directly
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-green-900">
          <div className="flex items-start gap-4">
            <Mail className="text-green-600 mt-1" />
            <div>
              <p className="font-bold">Email</p>
              <p>achoudhary.aryan@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="text-green-600 mt-1" />
            <div>
              <p className="font-bold">Phone</p>
              <p>+91-6375249154</p>
            </div>
          </div>
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

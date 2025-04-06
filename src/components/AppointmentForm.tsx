
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Appointment requested",
        description: "We'll contact you soon to confirm your appointment.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        reason: ''
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Request failed",
        description: "There was an error submitting your request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];
  
  // Available time slots
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM"
  ];
  
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-2xl font-bold text-xd-green mb-2">Request Appointment</h2>
      <p className="text-gray-600 mb-6">
        Schedule a consultation with our nutrition expert to get personalized advice.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name*
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address*
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number*
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="Your phone number"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Date*
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              min={today}
              value={formData.date}
              onChange={handleChange}
              className="input-field w-full"
            />
          </div>
          
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Time*
            </label>
            <select
              id="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="input-field w-full"
            >
              <option value="">Select a time slot</option>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Consultation
            </label>
            <textarea
              id="reason"
              name="reason"
              rows={4}
              value={formData.reason}
              onChange={handleChange}
              className="input-field w-full"
              placeholder="Please briefly describe why you would like to consult with our nutritionist..."
            ></textarea>
          </div>
        </div>
        
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h4 className="text-yellow-800 font-medium">Important Information:</h4>
          <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
            <li>Please arrive 10 minutes before your scheduled appointment time</li>
            <li>Bring your current diet plan and any recent medical reports</li>
            <li>We'll confirm your appointment via email and SMS</li>
          </ul>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto py-2 px-6 border border-transparent rounded-md shadow-sm text-white bg-xd-green hover:bg-xd-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-xd-green"
          >
            {isSubmitting ? "Submitting..." : "Request Appointment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;

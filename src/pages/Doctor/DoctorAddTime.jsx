import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DoctorAddTime = ({ docId, docSlots, getAvailableSlots }) => {
  const { backendUrl } = useContext(AppContext);
  const [newSlot, setNewSlot] = useState(null);
  const [loading, setLoading] = useState(false);

  const addNewSlot = async () => {
    if (!newSlot) {
      toast.warning("Үзлэг хийх өдөр цагаа сонгоно уу?");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/add-availability`, {
        docId,
        availableSlots: [...docSlots, newSlot], // You can also format it before sending
      });

      if (data.success) {
        toast.success("Амжилттай нэмэгдлээ");
        setNewSlot(null);
        getAvailableSlots();
      } else {
        toast.error("Could not add slot");
      }
    } catch (error) {
      toast.success("Амжилттай нэмэгдлээ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded shadow-md bg-white w-full max-w-sm">
      <DatePicker
        selected={newSlot}
        onChange={(date) => setNewSlot(date)}
        showTimeSelect
        timeFormat="hh:mm aa"
        timeIntervals={30}
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="үзлэгийн цагаа оруулна уу!"
        className="w-full px-3 py-2 mb-3 border rounded"
      />
      <button
        onClick={addNewSlot}
        disabled={loading || !newSlot}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Цаг нэмэх'}
      </button>
    </div>
  );
};

export default DoctorAddTime;

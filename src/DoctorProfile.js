import React from "react";

const DoctorProfileCard = ({ fd, oncardclick }) => {
  return (
    <div>
      {fd.map((f) => (
        <button
          onClick={() => {
            oncardclick(f.did);
          }}
          key={f.did}
        >
          <div className="doctor-card bg-white rounded-lg shadow-lg p-6 md:w-80">
            {/* <img
              src={URL.createObjectURL(f.Image)}
              alt="Doctor"
              className="doctor-image rounded-sm w-32 h-32 mx-auto mb-4 object-cover"
            /> */}
            <h2 className="doctor-name text-2xl font-bold text-center mb-2">
              {f.name}
            </h2>
            <p className="doctor-info text-gray-600 text-center mb-2">
              {f.Speciality}
            </p>
            <p className="doctor-info text-gray-600 text-center mb-2">
              {f.City}
            </p>
            <p className="doctor-info text-gray-600 text-center">
              {f.Hospital}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default DoctorProfileCard;

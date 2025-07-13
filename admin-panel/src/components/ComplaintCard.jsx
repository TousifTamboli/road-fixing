import React from "react";

function ComplaintCard({ complaint }) {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">{complaint.type}</h3>
      <p><strong>User:</strong> {complaint.name} ({complaint.email})</p>
      <p><strong>Phone:</strong> {complaint.phone}</p>
      <p><strong>Age:</strong> {complaint.age}</p>
      <p><strong>Landmark:</strong> {complaint.landmark}</p>
      <p className="mb-2"><strong>Description:</strong> {complaint.description}</p>
      <div className="grid grid-cols-2 gap-2">
        {complaint.images.map((img, idx) => (
          <img key={idx} src={img} alt={`complaint-img-${idx}`} className="w-full h-40 object-cover rounded" />
        ))}
      </div>
    </div>
  );
}

export default ComplaintCard;

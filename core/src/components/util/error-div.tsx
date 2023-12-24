"use client"
export default function ErrorDiv() {
  return (
    <div className="text-center">
      <p>
        Error! Please{" "}
        <button
          className="btn btn-secondary"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </p>
    </div>
  );
}

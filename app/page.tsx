export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-600">तर्केश्वर डेन्टल क्लिनिक</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">आपको डेन्टल स्वास्थ्य हाम्रो प्राथमिकता</h2>
          <p className="text-gray-600 mb-6">
            तर्केश्वर डेन्टल क्लिनिकमा स्वागतम। हामी आधुनिक दंत चिकित्सा सेवा प्रदान गर्दछौं।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/index.html" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">होम</h3>
            <p className="text-gray-600">मुख्य पृष्ठ हेर्नुहोस्</p>
          </a>
          
          <a href="/about.html" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">हामीको बारेमा</h3>
            <p className="text-gray-600">हाम्रो क्लिनिकको बारेमा जान्नुहोस्</p>
          </a>
          
          <a href="/service.html" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">सेवाहरू</h3>
            <p className="text-gray-600">हामले प्रदान गर्ने सेवाहरू देख्नुहोस्</p>
          </a>

          <a href="/team.html" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">टीम</h3>
            <p className="text-gray-600">हाम्रो डाक्टरहरूलाई जान्नुहोस्</p>
          </a>

          <a href="/appointment.html" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">अपोइन्टमेन्ट</h3>
            <p className="text-gray-600">अपोइन्टमेन्ट बुक गर्नुहोस्</p>
          </a>

          <a href="/contact.html" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">सम्पर्क</h3>
            <p className="text-gray-600">हामीलाई सम्पर्क गर्नुहोस्</p>
          </a>
        </div>
      </main>
    </div>
  )
}

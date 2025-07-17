"use client"

export function DeleteAccountButton() {
  const handleDeleteAccount = () => {
    const confirmed = confirm(
      "Are you sure you want to delete your account? This action is irreversible."
    )
    
    if (confirmed) {
      // For now, just show another alert since we're not implementing actual deletion
      alert("Account deletion is not implemented yet.")
    }
  }

  return (
    <button 
      onClick={handleDeleteAccount}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
    >
      Delete Account
    </button>
  )
} 
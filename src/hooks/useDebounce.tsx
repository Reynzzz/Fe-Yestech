import { useState, useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDebounce(value: any, delay: number) {
  // State untuk menyimpan nilai terakhir
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set timeout untuk menunda perubahan nilai
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Membersihkan timeout setiap kali nilai atau delay berubah
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce

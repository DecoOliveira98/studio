/**
 * Asynchronously validates a student using their educational email address or student ID.
 *
 * @param studentId The student ID or email address to validate.
 * @returns A promise that resolves to true if the student is valid, false otherwise.
 */
export async function validateStudent(studentId: string): Promise<boolean> {
  // Basic email format check
  if (!studentId.includes('@')) {
    return false;
  }

  //List of acceptable domains
  const allowedDomains = [
    'student.example.com',
    'college.example.edu',
    'university.example.ac.uk',
    'edu.ie', // Irish education domain
    'ucdconnect.ie', // Example Irish university domain
  ];

  const domain = studentId.split('@')[1];

  if (!allowedDomains.includes(domain)) {
    return false;
  }

  // TODO: Implement this by calling an API or a database check.
  // For now, just return true for demonstration purposes.

  return true;
}


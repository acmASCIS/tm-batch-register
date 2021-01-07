async function handleSubmit() {
  const mentorHandle = document.getElementById('mentorHandleInput').value;
  const traineeData = document.getElementById('traineesDataInput').value;
  const trainees = traineeData.split('\n').map((x) => {
    const [name, email, codeforcesHandle] = x.split('\t');
    return {
      name: name.trim(),
      email: email.trim(),
      codeforcesHandle: codeforcesHandle.trim(),
    };
  });

  try {
    await axios.post('/register', trainees);
    alert('Success');
  } catch {
    alert('Error');
  }
}

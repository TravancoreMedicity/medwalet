import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';

export default function LabourSelectBox({driverselection ,driver ,setDriverEmpid}) {
  return (
    <FormControl sx={{width:'100%'}}>
      <Autocomplete
        placeholder="Choose Driver"
        options={drivers}
        sx={{width: '100',fontSize: { xs: 12, sm: 16, md: 15, lg: 16 }}}
        slotProps={{
          listbox: {
            sx: {
              zIndex: 99999, 
              fontSize: { xs: 12, sm: 16, md: 15, lg: 16 } 
            },
          },
        }}
        onChange={(event, newValue) => {
          if (newValue) {
            driverselection(newValue);
            setDriverEmpid(newValue.empId)
          }
          else{
            driverselection("")
            setDriverEmpid("")
        }
        }}
        value={driver}
      />
    </FormControl>
  );
}

const drivers = [
  { label: 'Arun Nair', empId: 114817 },
  { label: 'Preethi Menon', empId: 114818 },
  { label: 'Vishnu Kumar', empId: 114819 },
  { label: 'Anjali Reddy', empId: 114820 },
  { label: 'Akhil George', empId: 114821 },
  { label: 'Neethu Suresh', empId: 114822 },
  { label: 'Sanjay Pillai', empId: 114823 },
  { label: 'Lakshmi Pradeep', empId: 114824 },
  { label: 'Manoj Nair', empId: 114825 },
  { label: 'Meera Varma', empId: 114826 },
  { label: 'Vivek Menon', empId: 114827 },
  { label: 'Sreeja Thomas', empId: 114828 },
  { label: 'Ravi Kannan', empId: 114829 },
  { label: 'Anu Joseph', empId: 114830 },
  { label: 'Sidharth Raj', empId: 114831 },
  { label: 'Divya Krishna', empId: 114832 },
  { label: 'Naveen Varghese', empId: 114833 },
  { label: 'Shalini David', empId: 114834 },
  { label: 'Rohit Babu', empId: 114835 },
  { label: 'Vidya Nair', empId: 114836 },
  { label: 'Aravind Soman', empId: 114837 },
  { label: 'Fahad Faizal', empId: 114838 },
  { label: 'Radhika Krishnan', empId: 114839 },
  { label: 'Ravindra Kumar', empId: 114840 },
  { label: 'Nisha Prakash', empId: 114841 },
  { label: 'Anoop Mohan', empId: 114842 },
  { label: 'Reshma Sajeev', empId: 114843 },
  { label: 'Midhun S', empId: 114844 },
  { label: 'Tina Koshy', empId: 114845 },
  { label: 'Ramesh Pillai', empId: 114846 },
  { label: 'Sanjana Thomas', empId: 114847 },
  { label: 'Ajith Kumar', empId: 114848 },
  { label: 'Neelima S', empId: 114849 },
  { label: 'Ratheesh Nair', empId: 114850 },
  { label: 'Deepa Ravi', empId: 114851 },
  { label: 'Kiran Raj', empId: 114852 },
  { label: 'Anjana Menon', empId: 114853 },
  { label: 'Vishnu Prakash', empId: 114854 },
  { label: 'Suma Devi', empId: 114855 },
  { label: 'Sreekanth Krishnan', empId: 114856 },
  { label: 'Lalitha Babu', empId: 114857 },
  { label: 'Biju Thomas', empId: 114858 },
  { label: 'Kavitha Suresh', empId: 114859 },
  { label: 'Krishna Kumar', empId: 114860 },
  { label: 'Geetha Menon', empId: 114861 },
  { label: 'Anil Balan', empId: 114862 },
  { label: 'Kavya Ramesh', empId: 114863 },
  { label: 'Jishnu George', empId: 114864 },
  { label: 'Radhakrishnan', empId: 114865 },
  { label: 'Shamsudheen', empId: 114866 }
];

//   { label: 'The Shawshank Redemption', year: 1994 },
//   { label: 'The Godfather', year: 1972 },
//   { label: 'The Godfather: Part II', year: 1974 },
//   { label: 'The Dark Knight', year: 2008 },
//   { label: '12 Angry Men', year: 1957 },
//   { label: "Schindler's List", year: 1993 },
//   { label: 'Pulp Fiction', year: 1994 },
//   {
//     label: 'The Lord of the Rings: The Return of the King',
//     year: 2003,
//   },
//   { label: 'The Good, the Bad and the Ugly', year: 1966 },
//   { label: 'Fight Club', year: 1999 },
//   {
//     label: 'The Lord of the Rings: The Fellowship of the Ring',
//     year: 2001,
//   },
//   {
//     label: 'Star Wars: Episode V - The Empire Strikes Back',
//     year: 1980,
//   },
//   { label: 'Forrest Gump', year: 1994 },
//   { label: 'Inception', year: 2010 },
//   {
//     label: 'The Lord of the Rings: The Two Towers',
//     year: 2002,
//   },
//   { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
//   { label: 'Goodfellas', year: 1990 },
//   { label: 'The Matrix', year: 1999 },
//   { label: 'Seven Samurai', year: 1954 },
//   {
//     label: 'Star Wars: Episode IV - A New Hope',
//     year: 1977,
//   },
//   { label: 'City of God', year: 2002 },
//   { label: 'Se7en', year: 1995 },
//   { label: 'The Silence of the Lambs', year: 1991 },
//   { label: "It's a Wonderful Life", year: 1946 },
//   { label: 'Life Is Beautiful', year: 1997 },
//   { label: 'The Usual Suspects', year: 1995 },
//   { label: 'Léon: The Professional', year: 1994 },
//   { label: 'Spirited Away', year: 2001 },
//   { label: 'Saving Private Ryan', year: 1998 },
//   { label: 'Once Upon a Time in the West', year: 1968 },
//   { label: 'American History X', year: 1998 },
//   { label: 'Interstellar', year: 2014 },
//   { label: 'Casablanca', year: 1942 },
//   { label: 'City Lights', year: 1931 },
//   { label: 'Psycho', year: 1960 },
//   { label: 'The Green Mile', year: 1999 },
//   { label: 'The Intouchables', year: 2011 },
//   { label: 'Modern Times', year: 1936 },
//   { label: 'Raiders of the Lost Ark', year: 1981 },
//   { label: 'Rear Window', year: 1954 },
//   { label: 'The Pianist', year: 2002 },
//   { label: 'The Departed', year: 2006 },
//   { label: 'Terminator 2: Judgment Day', year: 1991 },
//   { label: 'Back to the Future', year: 1985 },
//   { label: 'Whiplash', year: 2014 },
//   { label: 'Gladiator', year: 2000 },
//   { label: 'Memento', year: 2000 },
//   { label: 'The Prestige', year: 2006 },
//   { label: 'The Lion King', year: 1994 },
//   { label: 'Apocalypse Now', year: 1979 },
//   { label: 'Alien', year: 1979 },
//   { label: 'Sunset Boulevard', year: 1950 },
//   {
//     label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
//     year: 1964,
//   },
//   { label: 'The Great Dictator', year: 1940 },
//   { label: 'Cinema Paradiso', year: 1988 },
//   { label: 'The Lives of Others', year: 2006 },
//   { label: 'Grave of the Fireflies', year: 1988 },
//   { label: 'Paths of Glory', year: 1957 },
//   { label: 'Django Unchained', year: 2012 },
//   { label: 'The Shining', year: 1980 },
//   { label: 'WALL·E', year: 2008 },
//   { label: 'American Beauty', year: 1999 },
//   { label: 'The Dark Knight Rises', year: 2012 },
//   { label: 'Princess Mononoke', year: 1997 },
//   { label: 'Aliens', year: 1986 },
//   { label: 'Oldboy', year: 2003 },
//   { label: 'Once Upon a Time in America', year: 1984 },
//   { label: 'Witness for the Prosecution', year: 1957 },
//   { label: 'Das Boot', year: 1981 },
//   { label: 'Citizen Kane', year: 1941 },
//   { label: 'North by Northwest', year: 1959 },
//   { label: 'Vertigo', year: 1958 },
//   {
//     label: 'Star Wars: Episode VI - Return of the Jedi',
//     year: 1983,
//   },
//   { label: 'Reservoir Dogs', year: 1992 },
//   { label: 'Braveheart', year: 1995 },
//   { label: 'M', year: 1931 },
//   { label: 'Requiem for a Dream', year: 2000 },
//   { label: 'Amélie', year: 2001 },
//   { label: 'A Clockwork Orange', year: 1971 },
//   { label: 'Like Stars on Earth', year: 2007 },
//   { label: 'Taxi Driver', year: 1976 },
//   { label: 'Lawrence of Arabia', year: 1962 },
//   { label: 'Double Indemnity', year: 1944 },
//   {
//     label: 'Eternal Sunshine of the Spotless Mind',
//     year: 2004,
//   },
//   { label: 'Amadeus', year: 1984 },
//   { label: 'To Kill a Mockingbird', year: 1962 },
//   { label: 'Toy Story 3', year: 2010 },
//   { label: 'Logan', year: 2017 },
//   { label: 'Full Metal Jacket', year: 1987 },
//   { label: 'Dangal', year: 2016 },
//   { label: 'The Sting', year: 1973 },
//   { label: '2001: A Space Odyssey', year: 1968 },
//   { label: "Singin' in the Rain", year: 1952 },
//   { label: 'Toy Story', year: 1995 },
//   { label: 'Bicycle Thieves', year: 1948 },
//   { label: 'The Kid', year: 1921 },
//   { label: 'Inglourious Basterds', year: 2009 },
//   { label: 'Snatch', year: 2000 },
//   { label: '3 Idiots', year: 2009 },
//   { label: 'Monty Python and the Holy Grail', year: 1975 },
// ];
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  CircularProgress,
  TextField,
  InputAdornment
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Modal } from 'antd';
import AxiosInstance from '../../AxiosInstance';

// Create a blue theme
const blueTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#1976d2',
          color: '#fff',
          fontWeight: 'bold',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#1976d2',
        },
      },
    },
  },
});

const DetailSection = ({ data }) => {
  const sections = ['clearLandDetails', 'plantationDetails', 'fenceDetails'];
  const availableSections = sections.filter(section => data[section] && Object.keys(data[section]).length > 0);

  const getDisplayData = (sectionData, sectionName) => {
    switch(sectionName) {
      case 'clearLandDetails':
        return {
          'No of Labourers': sectionData.laborCount, 
          'Work hours': sectionData.workHours + ' hours',
          'Weed type': sectionData.weedType,
          'Plant Details': sectionData.plantDetails,
          'Stones Details': sectionData.stoneDetails,
          'Machniery Details': sectionData.machineDetails,
          'Weed Effort': parseFloat(sectionData.weedEffort).toFixed(2) + ' hours',
          'Plant Effort': parseFloat(sectionData.plantEffort).toFixed(2)  + ' hours',
          'Stone Effort': parseFloat(sectionData.stoneEffort).toFixed(2) + ' hours',
          'Work Duration': sectionData.workDays + ' days '
        };
      case 'plantationDetails':
        return {
          'Plant Type': sectionData.plantType,
          'Plant Space': sectionData.plantSpace + 'cm',
          'Row Space': sectionData.rowSpace + 'cm',
          'Number of Plants': sectionData.numberOfPlants,
          'Plant Density': sectionData.plantDensity + 'sqm',
        };
      case 'fenceDetails':
        return {
          'Fence Type': sectionData.fenceType,
          'Post Space': sectionData.postSpace + sectionData.postSpaceUnit,
          'Number of Sticks': sectionData.numberOfSticks,
          'Number of Gates': sectionData.fenceAmount,
          'Gate Details': sectionData.gateDetails
        };
      default:
        return {};
    }
  };



  return (
    <Box sx={{ margin: 1 }}>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
          <TableHead>
            <TableRow>
              {availableSections.map((section, index) => (
                <TableCell 
                  key={section} 
                  sx={{ 
                    backgroundColor: '#1976d2', 
                    color: '#fff', 
                    fontWeight: 'bold',
                    borderRight: index < availableSections.length - 1 ? '2px solid #fff' : 'none'
                  }}
                >
                  {section.replace('Details', '').charAt(0).toUpperCase() + section.replace('Details', '').slice(1)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {availableSections.map((section, columnIndex) => (
                <TableCell 
                  key={section}
                  sx={{
                    borderRight: columnIndex < availableSections.length - 1 ? '1px solid rgba(224, 224, 224, 1)' : 'none',
                    verticalAlign: 'top'
                  }}
                >
                  {Object.entries(getDisplayData(data[section], section)).map(([key, value]) => (
                    <div key={key}>
                      <Typography component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {key}:
                      </Typography>{' '}
                      {value}
                    </div>
                  ))}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [mapsOpen, setMapsOpen] = useState({});
  const [maps, setMaps] = useState(row.maps || []);

  const handleExpand = () => {
    setOpen(!open);
  };

  const handleMapExpand = async (mapId) => {
    if (!mapsOpen[mapId]) {
      const details = await props.fetchMapDetails(mapId);
      setMaps(prevMaps => 
        prevMaps.map(map => 
          map._id === mapId ? { ...map, details, locationPoints: details.locationPoints } : map
        )
      );
    }
    setMapsOpen(prev => ({ ...prev, [mapId]: !prev[mapId] }));
  };

  const handleDelete = (mapId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this template?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await AxiosInstance.delete(`/api/auth/mapTemplate/deleteTemplate/${mapId}`);
          setMaps(prevMaps => prevMaps.filter(map => map._id !== mapId));
          props.updateUserMaps(row._id, maps.length - 1);
        } catch (error) {
          console.error("Error deleting map template:", error);
        }
      },
    });
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleExpand}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.name}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.numberOfMaps}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Maps
              </Typography>
              <Table size="small" aria-label="maps">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Template Name</TableCell>
                    <TableCell>Land Type</TableCell>
                    <TableCell>Area</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Perimeter</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {maps.map((map) => (
                    <React.Fragment key={map._id}>
                      <TableRow>
                        <TableCell>
                          <IconButton
                            aria-label="expand map"
                            size="small"
                            onClick={() => handleMapExpand(map._id)}
                          >
                            {mapsOpen[map._id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="row">{map.templateName}</TableCell>
                        <TableCell>{map.landType}</TableCell>
                        <TableCell>{map.area} perch</TableCell>
                        <TableCell>{map.location}</TableCell>
                        <TableCell>{map.perimeter} km</TableCell>
                        <TableCell>{map.description}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="delete map"
                            size="small"
                            style={{ color: 'red' }}
                            onClick={() => handleDelete(map._id)}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                          <Collapse in={mapsOpen[map._id]} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                              <Typography variant="h6" gutterBottom component="div">
                                Details
                              </Typography>
                              <DetailSection data={map.details || {}} />
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const UserMapsTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsersAndMaps();
  }, []);

  const fetchUsersAndMaps = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.get("/api/users/getAllUsers");
      console.log("API response:", response.data);

      const usersWithMaps = await Promise.all(response.data.users.map(async user => {
        const userMaps = await fetchUserMaps(user._id);
        return {
          ...user,
          key: user._id,
          name: `${user.fname} ${user.lname}`,
          numberOfMaps: userMaps.length,
          maps: userMaps,
        };
      }));

      setUsers(usersWithMaps);
    } catch (error) {
      console.error("Error fetching users and maps:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserMaps = async (userId) => {
    try {
      const response = await AxiosInstance.get(`/api/auth/mapTemplate/getAllTemplates/${userId}`);
      console.log("Maps for user", userId, ":", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user maps:", error);
      return [];
    }
  };

  const fetchMapDetails = async (mapId) => {
    try {
      const response = await AxiosInstance.get(`/api/auth/mapTemplate/getAllmapData/${mapId}`);
      console.log("Map details response:", response.data);
      return {
        ...response.data,
        locationPoints: response.data.locationPoints || []
      };
    } catch (error) {
      console.error("Error fetching map details:", error);
      return null;
    }
  };

  const updateUserMaps = (userId, mapCount) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user._id === userId ? { ...user, numberOfMaps: mapCount } : user
      )
    );
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={blueTheme}>
      <TextField
        placeholder="Search by name or email"
        variant="outlined"
        style={{ margin: '1rem', width: '35%' , borderRadius: '5px' , float: "right" ,}}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
       InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
    style: { height: '40px' } // Adjust this value to your preferred height
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      height: '40px', // Adjust this value to match the InputProps height
    },
    marginBottom: '20px' // Add some space below the search box
  }}
      />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Number of Maps</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <Row 
                key={user._id} 
                row={user} 
                fetchUserMaps={fetchUserMaps}
                fetchMapDetails={fetchMapDetails}
                updateUserMaps={updateUserMaps}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export default UserMapsTable;

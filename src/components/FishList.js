import React, { useState, useEffect } from 'react';
import { fetchFish, addFish, updateFish, deleteFish } from '../api/fishApi';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  TextField,
  Grid,
  Avatar,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, Edit, Add } from '@mui/icons-material';
import styles from './FishList.module.css';

const FishList = () => {
  const [fish, setFish] = useState([]);
  const [newFish, setNewFish] = useState({ species: '', characteristics: '' });
  const [editingFish, setEditingFish] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchFish();
      setFish(data);
    };
    loadData();
  }, []);

  const handleAddFish = async () => {
    if (newFish.species) {
      await addFish(newFish);
      setNewFish({ species: '', characteristics: '' });
      setFish(await fetchFish());
    }
  };

  const handleUpdateFish = async () => {
    if (editingFish) {
      await updateFish(editingFish.id, editingFish);
      setEditingFish(null);
      setOpenDialog(false);
      setFish(await fetchFish());
    }
  };

  const handleDelete = async (id) => {
    await deleteFish(id);
    setFish(fish.filter(f => f.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="h4" className={styles.title}>
          Каталог рыб
        </Typography>
        <div className={styles.addForm}>
          <TextField
            label="Вид рыбы"
            value={newFish.species}
            onChange={(e) => setNewFish({ ...newFish, species: e.target.value })}
            size="small"
            sx={{ mr: 1 }}
          />
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={handleAddFish}
          >
            Добавить
          </Button>
        </div>
      </div>

      <Grid container spacing={3}>
        <AnimatePresence>
          {fish.map((fishItem) => (
            <Grid item xs={12} sm={6} md={4} key={fishItem.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={styles.card}>
                  <CardContent>
                    <div className={styles.cardHeader}>
                      <Avatar className={styles.avatar}>
                        {fishItem.species.charAt(0)}
                      </Avatar>
                      <Typography variant="h6" className={styles.species}>
                        {fishItem.species}
                      </Typography>
                    </div>
                    <Typography variant="body2" className={styles.details}>
                      {fishItem.characteristics}
                    </Typography>
                    <div className={styles.footer}>
                      <Chip
                        label={new Date(fishItem.createdAt?.seconds * 1000).toLocaleDateString()}
                        size="small"
                        className={styles.dateChip}
                      />
                      <div>
                        <IconButton 
                          size="small" 
                          onClick={() => {
                            setEditingFish(fishItem);
                            setOpenDialog(true);
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => handleDelete(fishItem.id)}
                        >
                          <Delete fontSize="small" color="error" />
                        </IconButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {/* Диалог редактирования */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Редактировать рыбу</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Вид рыбы"
            fullWidth
            value={editingFish?.species || ''}
            onChange={(e) => setEditingFish({ 
              ...editingFish, 
              species: e.target.value 
            })}
          />
          <TextField
            margin="dense"
            label="Характеристики"
            fullWidth
            value={editingFish?.characteristics || ''}
            onChange={(e) => setEditingFish({ 
              ...editingFish, 
              characteristics: e.target.value 
            })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
          <Button onClick={handleUpdateFish} variant="contained">Сохранить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FishList;
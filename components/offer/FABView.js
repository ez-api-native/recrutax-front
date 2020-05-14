import React, {useState, useCallback} from 'react';
import {Button, Dialog, FAB, TextInput} from 'react-native-paper';
import {useFormik} from 'formik';
import axios from '~/lib/axios';

const FABView = ({offer, onAction}) => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = useCallback(() => {
    axios.delete(`/offers/${offer.id}`);
    onAction('delete');
  }, [offer, onAction]);

  const {
    values: {email},
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async values => {
      const res = await axios.post('/submissions', {
        email: values.email,
        offer: `/offers/${offer.id}`,
      });
      if (res.status === 201) {
        setDialogOpen(false);
        setOpen(false);
        onAction('invite');
        resetForm();
      }
    },
  });

  return (
    <>
      <Dialog visible={dialogOpen} onDismiss={() => setDialogOpen(false)}>
        <Dialog.Title>Invite email</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="E-Mail"
            value={email}
            onChangeText={handleChange('email')}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleSubmit}>Invite</Button>
        </Dialog.Actions>
      </Dialog>

      <FAB.Group
        open={open}
        icon={open ? 'close' : 'menu'}
        style={{
          paddingBottom: 48,
        }}
        actions={[
          {
            icon: 'delete',
            label: 'Delete',
            onPress: handleDelete,
          },
          {
            icon: 'email',
            label: 'Invite',
            onPress: () => setDialogOpen(true),
          },
        ]}
        onStateChange={e => setOpen(e.open)}
      />
    </>
  );
};

export default FABView;

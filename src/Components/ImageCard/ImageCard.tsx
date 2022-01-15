import { useState } from 'react';

import { TestProps } from '../../Config/Tests/Test.types';
import { Modal } from '../Modal';
import {
  CardTitle,
  ImageCardContainer,
  ModalTitle,
  Thumbnail,
} from './ImageCard.styles';
import { ImageCardProps, DefaultImageCardProps } from './ImageCard.types';

export const imageCardDefaults: Required<DefaultImageCardProps> &
  Required<TestProps> = {
  testID: 'ImageCard',
};

export const ImageCard: React.FC<ImageCardProps> = (props): JSX.Element => {
  const {
    testID = imageCardDefaults.testID,
    id,
    thumbnailUrl,
    imageUrl,
    title,
    ...others
  } = props;

  const [open, setOpen] = useState(false);

  const handleOpenClose = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <ImageCardContainer key={id} data-testid={testID} {...others}>
      <Thumbnail onClick={handleOpenClose} src={thumbnailUrl} />
      <CardTitle variant="body2">{title}</CardTitle>
      {open && (
        <Modal onClose={handleOpenClose}>
          <img alt={title} src={imageUrl} />
          <ModalTitle variant="h5">{title}</ModalTitle>
        </Modal>
      )}
    </ImageCardContainer>
  );
};

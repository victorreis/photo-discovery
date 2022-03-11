import { useState } from 'react';

import { nanoid } from 'nanoid';

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
    italicizedWord,
    ...others
  } = props;

  const [open, setOpen] = useState(false);

  const handleOpenClose = () => {
    setOpen((prevState) => !prevState);
  };

  const renderTitle = () => {
    if (!italicizedWord) {
      return title;
    }

    const wholeWordsToBeItalicized: Record<string, unknown> = {};
    const splitedItalicizedWords = italicizedWord
      .split(' ')
      .map((word) => `\\w*${word}\\w*`)
      .join('|');
    const regex = new RegExp(`(${splitedItalicizedWords})`, 'gi');

    let regexResult = regex.exec(title);
    while (regexResult) {
      const resultAt = regexResult.at(regexResult.length - 1);
      if (resultAt) {
        if (resultAt) {
          wholeWordsToBeItalicized[resultAt] = true;
        }
      }
      regexResult = regex.exec(title);
    }

    const finalTitle = title.split(' ').map((word) =>
      wholeWordsToBeItalicized[word] ? (
        <>
          <mark key={nanoid()}>
            <strong>
              <i>{word}</i>
            </strong>
          </mark>{' '}
        </>
      ) : (
        `${word} `
      )
    );

    return finalTitle;
  };

  return (
    <ImageCardContainer data-testid={testID} key={id} {...others}>
      <Thumbnail onClick={handleOpenClose} src={thumbnailUrl} />
      <CardTitle variant="body2">{renderTitle()}</CardTitle>
      {open && (
        <Modal onClose={handleOpenClose}>
          <img alt={title} src={imageUrl} />
          <ModalTitle variant="h5">{title}</ModalTitle>
        </Modal>
      )}
    </ImageCardContainer>
  );
};

import { TestProps } from '../../Config/Tests/Test.types';

export interface RequiredImageCardProps {
  /**
   * Card identificator.
   */
  id: string;

  /**
   * Thumbnail url.
   */
  thumbnailUrl: string;

  /**
   * Image url.
   */
  imageUrl: string;

  /**
   * Title shown in the card.
   */
  title: string;
}

export interface DefaultImageCardProps {}

export interface OptionalImageCardProps {
  /**
   * Word or piece of word that will guide what words will be italicized.
   */
  italicizedWord?: string;
}

export type ImageCardProps = RequiredImageCardProps &
  DefaultImageCardProps &
  OptionalImageCardProps &
  TestProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;

export type ImageCardStyleProps = Required<DefaultImageCardProps>;

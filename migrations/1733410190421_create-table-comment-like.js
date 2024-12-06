/* eslint-disable camelcase */
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('likes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    comment_id: {
      type: 'VARCHAR(50)',
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
    },
    updated_at: {
      type: 'TEXT',
    },
    deleted_at: {
      type: 'TEXT',
    },
  });

  pgm.addConstraint(
    'likes',
    'fk_likes.comment_id.comments.id',
    'FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE'
  );

  pgm.addConstraint(
    'likes',
    'fk_likes.owner.users.id',
    'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

exports.down = (pgm) => {
  pgm.dropTable('likes');
};

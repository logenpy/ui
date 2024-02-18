//! Type definitions and convenient functions for [`crate::map::Map`] positioning.

use std::simd::u32x2;

/// Linear map index. Starts from 0.
pub type Index = u32;

/// 2D map position. Starts from [0, 0].
pub type Pos = u32x2;

/// Types that can be converted to [`Pos`].
pub trait ToPos {
    /// Converts self to [`Pos`].
    fn to_pos(self, width: u32) -> Pos;
}

impl ToPos for Index {
    /// Converts [`Index`] to [`Pos`].
    ///
    /// # Example
    ///
    /// ```rust
    /// use wasm::pos::ToPos;
    ///
    /// assert_eq!(4.to_pos(3), [1, 1].into());
    /// ```
    #[inline]
    fn to_pos(self, width: u32) -> Pos {
        [self / width, self % width].into()
    }
}

impl ToPos for Pos {
    /// No-op.
    #[inline]
    fn to_pos(self, _width: u32) -> Pos {
        self
    }
}

/// Types that can be converted to [`Index`].
pub trait ToIndex {
    /// Converts self to [`Index`].
    fn to_index(self, width: u32) -> Index;
}

impl ToIndex for Pos {
    /// Converts [`Pos`] to [`Index`].
    ///
    /// # Example
    ///
    /// ```rust
    /// use wasm::pos::{Pos, ToIndex};
    ///
    /// assert_eq!(Pos::from([1, 1]).to_index(3), 4);
    /// ```
    #[inline]
    fn to_index(self, width: u32) -> Index {
        self[0] * width + self[1]
    }
}

impl ToIndex for Index {
    /// No-op.
    #[inline]
    fn to_index(self, _width: u32) -> Index {
        self
    }
}

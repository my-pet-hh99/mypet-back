> 작성일 : 2022-08-12

| 설명              | 경로                          | Body 유무 |  Bearer 토큰 | 담당자 |
| :---------------  | :---------------------------- | :-------- | :---------- | :---- |
| 로그인 요청       | POST /api/user/login               | { nickname, password, confirm } | - | @codeing999 |
| 회원가입          | POST /api/user/signup              | { nickname, password }  | - | @codeing999 |
| 아이디 중복 검사  | GET /api/user/idCheck/:username   | { title, content } | - | @unchaptered |
| 액세스 토큰 발급  | POST /api/user/token                  | - | - | @unchaptered |
| 로그아웃          | GET /api/user/logout              | - | - | @unchaptered |
| 사진 업로드       | POST /api/image              | { title, content } | - | @unchaptered |
| 게시글 작성       | POST /api/post           | - | - | @unchaptered |
| 게시글 전체 조회  | PUT /article/:id/toggle-like  | { isLike } | - | @rumaro122  |
| 게시글 조회       | POST /comment/:articleId                | { content }| -  | @JeungHoSub |
| 게시글 수정       | GET /comment                  | | - | @JeungHoSub |
| 게시글 삭제       | PUT /comment/:commentId              | | - | @JeungHoSub |
| 댓글 조회         | DELETE /comment/:commentId           | | - | @JeungHoSub |
| 댓글 작성         | PUT /comment/:id/toggle-like  | { isLike } | - | @rumaro122  |
| 댓글 수정         | PUT /comment/:id/toggle-like  | { isLike } | - | @rumaro122  |
| 댓글 삭제         | PUT /comment/:id/toggle-like  | { isLike } | - | @rumaro122  |